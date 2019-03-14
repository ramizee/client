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

const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 200%;
  height: 500px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  background: linear-gradient(rgb(27, 124, 186), rgb(2, 46, 101));
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

class Change extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      birthday: null,
      userList: null
    };
  }

  handleInputChange(key, value) {
    this.setState({ [key]: value });
  }


  saveusername() {
    // TODO: check changed username and put on server
    fetch(`${getDomain()}/users/${localStorage.getItem("user_id")}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: this.state.username
        })
      })
        .then(response => response.json())
        .then(res => {
          if (res.error) {
            alert(res.message);
            this.setState({username: null});
          } else { //nach speichern der Änderung geht man zu profile Seite
            this.props.history.push(`/profile/${localStorage.getItem("user_id")}/show`)
          }
        })
        .catch(err => {
          if (err.message.match(/Failed to fetch/)) {
            alert("The server cannot be reached. Did you start it?");
          } else {
            alert(`Something went wrong during the login: ${err.message}`);
          }
        });
    }


    savebirthday() {
      // TODO: check changed birthday and put on server
      fetch(`${getDomain()}/users/${localStorage.getItem("user_id")}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            birthday: this.state.birthday
          })
        })
          .then(response => response.json())
          .then( res=>{
            if (res.error) {
              alert(res.message);
              this.setState({birthday: null});
            } else{ //nach speichern der Änderung geht man zu profile Seite
              this.props.history.push(`/profile/${localStorage.getItem("user_id")}/show`)
            }
          })
          .catch(err => {
            if (err.message.match(/Failed to fetch/)) {
              alert("The server cannot be reached. Did you start it?");
            } else {
              alert(`Something went wrong during the login: ${err.message}`);
            }
          });
      }


  return(){ //go back to the site of game when we dont want to change
    this.props.history.push(`/game`);
  }

  componentDidMount() { //brauche die userList
    fetch(`${getDomain()}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(users => {
        this.setState({ userList: users });
      })
      .catch(err => {
        console.log(err);
        alert("Something went wrong fetching the users: " + err);
      });
  }

  render() {
    return (
      <BaseContainer>
        <FormContainer>
          <Form>
            <Label>New Username</Label>
            <InputField
              placeholder="Enter your new username here.."
              onChange={e => {
                this.handleInputChange("username", e.target.value);
              }}
            />

            <ButtonContainer>
              <Button
                disabled={!this.state.username}
                width="50%"
                onClick={() => {
                  this.saveusername();
                }}
              >
                Save Username
              </Button>
            </ButtonContainer>

            <Label>New Birthday</Label>
            <InputField
              placeholder="Enter your new birthday here.."
              onChange={e => {
                this.handleInputChange("birthday", e.target.value);
              }}
            />
            <ButtonContainer>
              <Button
                disabled={!this.state.birthday}
                width="50%"
                onClick={() => {
                  this.savebirthday();
                }}
              >
                Save Birthday
              </Button>
            </ButtonContainer>
            <ButtonContainer>
              <Button
                width="50%"
                onClick={() => {
                  this.return();
                }}
              >
                Back
              </Button>
            </ButtonContainer>
          </Form>
        </FormContainer>
      </BaseContainer>
    );
  }
}

export default withRouter(Change);