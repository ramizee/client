import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import { Button } from "../../views/design/Button";
import { withRouter } from "react-router-dom";
import User from "../shared/models/User";

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
      mine: false
    };
  }

  return() {
    this.props.history.push("/game");
  }

  change() {
    this.props.history.push(`/profile/change`);
  }

  componentDidMount() {
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
            //show the button only if you are loged in with
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