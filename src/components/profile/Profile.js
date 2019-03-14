import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import { Button } from "../../views/design/Button";
import { withRouter } from "react-router-dom";

const Container = styled(BaseContainer)`
  color: white;
  text-align: left;
`;

const ButtonContainer = styled.div`
display: flex;
justify-content: center;
margin-top: 20px;
`;

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      status: null,
      creationDate: null,
      birthday: null,
      mine: false //it is right if you want to show the profile of the user in which you are logged in
    };
  }

  return() { //go back to the site of game with all users
    this.props.history.push("/game");
  }

  change() { //go to the site where you can change your username and birthday
    this.props.history.push(`/profile/change`);
  }

  componentDidMount() { //bekomme die Daten von dem user damit ich diese sehen kann
    fetch(`${getDomain()}/users/${this.props.match.params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then( user => {
        this.setState({username: user.username});
        this.setState({status: user.status});
        this.setState({creationDate: user.creationDate});
        this.setState({birthday: user.birthday});
        this.setState({mine: user.token === localStorage.getItem("token")})
      })
      .catch(err => {
        console.log(err);
        alert("Something went wrong fetching the users: " + err);
      });
  }

  render() {
    return (
      <Container>
        <h2>Profile of {this.state.username} </h2>
        <table width="400px">
          <tr>
            <th >username:</th>
            <th>{this.state.username}</th>
          </tr>
          <tr>
            <th>status:</th>
            <th>{this.state.status}</th>
          </tr>
          <tr>
            <th>creation date:</th>
            <th>{this.state.creationDate}</th>
          </tr>
          <tr>
            <th>birthday:</th>
            <th>{this.state.birthday}</th>
          </tr>
        </table>
        <ButtonContainer>
          <Button
            width="40%"
            onClick={() => {
              this.return();
            }}
          >
            Go back
          </Button>

          <Button
            //show the button only if you are logged in with the current username and change smth just by this username profile
            disabled={!this.state.mine}
            width="40%"
            onClick={() => {
              this.change();
            }}
          >
            Change

          </Button>

        </ButtonContainer>
      </Container>
    );
  }
}

export default withRouter(Profile);