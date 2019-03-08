import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import Player from "../../views/Player";
import { Spinner } from "../../views/design/Spinner";
import { Button } from "../../views/design/Button";
import { withRouter } from "react-router-dom";

const Container = styled(BaseContainer)`
  color: white;
  text-align: left;
`;

const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
`;

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      name: null,
      username: null,
      password: null,
      creationDate: null
    };
  }

  return() {
    this.props.history.push("/game");
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
        <Button
          width="100%"
          onClick={() => {
            this.getBack();
          }}
        >
          Go back
        </Button>
      </Container>
    );
  }
}

export default withRouter(Profile);