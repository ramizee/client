import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import User from "../shared/models/User";
import { withRouter } from "react-router-dom";
import { Button } from "../../views/design/Button";

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
  width: 60%;
  height: 375px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  background: linear-gradient(rgb(27, 124, 186), rgb(2, 46, 101));
  transition: opacity 0.5s ease, transform 0.5s ease;
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

/**
 * Classes in React allow you to have an internal state within the class and to have the React life-cycle for your component.
 * You should have a class (instead of a functional component) when:
 * - You need an internal state that cannot be achieved via props from other parent components
 * - You fetch data from the server (e.g., in componentDidMount())
 * - You want to access the DOM via Refs
 * https://reactjs.org/docs/react-component.html
 * @Class
 */
class Login extends React.Component {
  /**
   * If you don’t initialize the state and you don’t bind methods, you don’t need to implement a constructor for your React component.
   * The constructor for a React component is called before it is mounted (rendered).
   * In this case the initial state is defined in the constructor. The state is a JS object containing two fields: name and username
   * These fields are then handled in the onChange() methods in the resp. InputFields
   */
  constructor() {
    super();
    this.state = {
      token: null,
      username: null,
      password: null,
      userList: null
    };
  }
  /**
   * HTTP POST request is sent to the backend.
   * If the request is successful, a new user is returned to the front-end and its token is stored in the localStorage.
   */
  login() { //man logt sich ein und schickt die Daten zu dbs
    fetch(`${getDomain()}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ //nur mit username und password einloggen
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(res => {
        if (res.error) { //wenn login nicht ausgeführt wird, bleibt man auf login Seite
          alert(res.message);
          this.props.history.push('/login')
        } else { //wenn richtige username und password, dann wird es dem usern ein token und id zugestellt
          const user = new User(res);
          localStorage.setItem("token", user.token);
          localStorage.setItem("user_id", user.id);
          this.props.history.push('/login') //LoginGoard wenn ich Item habe dann geht zu game
        }
      })
      .catch(err => {
        //console.log("nope");
        if (err.message.match(/Failed to fetch/)) {
          alert("The server cannot be reached. Did you start it?");
        } else {
          alert(`Something went wrong during the login: ${err.message}`);
        }
      });
  }

  register(){
    this.props.history.push("/register");
  }
  /**
   *  Every time the user enters something in the input field, the state gets updated.
   * @param key (the key of the state for identifying the field that needs to be updated)
   * @param value (the value that gets assigned to the identified state key)
   */
  handleInputChange(key, value) {
    // Example: if the key is username, this statement is the equivalent to the following one:
    // this.setState({'username': value});
    this.setState({ [key]: value });
  }

  /**
   * componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
   * Initialization that requires DOM nodes should go here.
   * If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
   * You may call setState() immediately in componentDidMount().
   * It will trigger an extra rendering, but it will happen before the browser updates the screen.
   */
  componentDidMount() { //bekommt die Daten um zu überprüfen ob mit richtige Daten angemeldet ist
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
            <Label>Username</Label>
            <InputField
              placeholder="Enter here.."
              onChange={e => {
                this.handleInputChange("username", e.target.value);
              }}
            />
            <Label>Password</Label>
            <InputField
              placeholder="Enter here.."
              type="password"
              onChange={e => {
                this.handleInputChange("password", e.target.value);
              }}
            />
            <ButtonContainer>
              <Button
                disabled={!this.state.username || !this.state.password}
                width="50%"
                onClick={() => {
                  this.login();
                }}
              >
                Login
              </Button>
            </ButtonContainer>
            <ButtonContainer>
              <Button
                width="50%"
                onClick={() => {
                  this.register();
                }}
              >
                Register
              </Button>
            </ButtonContainer>
          </Form>
        </FormContainer>
      </BaseContainer>
    );
  }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(Login);
