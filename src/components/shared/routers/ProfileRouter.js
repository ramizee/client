import React from "react";
import styled from "styled-components";
import { Redirect, Route } from "react-router-dom";
import Profile from "../../profile/Profile";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

class ProfileRouter extends React.Component {
  render() {
    /**
     * "this.props.base" is "/app" because as been passed as a prop in the parent of GameRouter, i.e., App.js
     */
    return (
      <Container>
        <Route
          exact
          path={`${this.props.base}/:id`}
          render={() => <Profile />}
        />

        <Route
          exact
          path={`${this.props.base}`}
          // wieso am Schluss eine 1
          render={() => <Redirect to={`${this.props.base}/1`} />}
        />
      </Container>
    );
  }
}
/*
* Don't forget to export your component!
 */
export default ProfileRouter;
