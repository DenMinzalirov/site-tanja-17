import React from "react";
import { Container } from "react-bootstrap";

import LogInForm from "./LogInForm";
import CreateItemScreen from "./CreateItemScreen";

const Account = (props) => {
  return (
    <Container>
      {props.isLoggedIn ? <CreateItemScreen allbase={props} /> : <LogInForm />}
    </Container>
  );
};

export default Account;
