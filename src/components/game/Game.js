import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import Player from "../../views/Player";
import User from "../shared/models/User";
import { Spinner } from "../../views/design/Spinner";
import { Button } from "../../views/design/Button";
import { withRouter } from "react-router-dom";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

const Users = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
`;

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      users: null
    };
  }

  logout() { //geht zurück zu login Seite wenn man sich abmelden will
    fetch(`${getDomain()}/logout/${localStorage.getItem("user_id")}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(response => response.json())
      .then(res => {
        if (res.error) {
          alert(res.message);
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("user_id")
          console.log("logging out")
          this.props.history.push("/login");
        }
      })
      .catch(err => {
        console.log(err);
        alert("Something went wrong fetching the users: " + err);
      });
  }

  componentDidMount() { //bekomme alle users usernames
    fetch(`${getDomain()}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(async users => {
        // delays continuous execution of an async operation for 0.8 seconds.
        // This is just a fake async call, so that the spinner can be displayed
        // feel free to remove it :)
        await new Promise(resolve => setTimeout(resolve, 800));

        this.setState({ users });
      })
      .catch(err => {
        console.log(err);
        alert("Something went wrong fetching the users: " + err);
      });
  }

  render() {
    return (
      <Container>
        <h2>Happy Coding! </h2>
        <p>Get all users from secure end point:</p>
        {!this.state.users ? (
          <Spinner />
        ) : (
          <div>
            <Users>
              {this.state.users.map(user => {
                return (
                  <PlayerContainer
                    key={user.id} onClick={() => { //wenn man auf den user drauf klickt dann sieht man seine profil seite
                    this.props.history.push(`/profile/${user.id}/show`);
                  }}
                  >
                    <Player user={user} />
                  </PlayerContainer>
                );
              })}
            </Users>
            <Button
              width="100%"
              onClick={() => {
                this.logout();
              }}
            >
              Logout
            </Button>
          </div>
        )}
      </Container>
    );
  }
}

export default withRouter(Game);
