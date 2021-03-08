import React, { Component } from "react";
import {
  Container,
  Divider,
  Form,
  Header,
  Image,
  Button,
} from "semantic-ui-react";
import logo from "../../assets/images/favicons/favicon.ico";

class Login extends Component {
  state = {
    email: {
      type: "email",
      value: "",
      valid: false,
    },
    password: {
      type: "password",
      value: "",
      valid: false,
    },
  };
  render() {
    return (
      <Container fluid>
        {/* Header part */}
        <Header as="h2" textAlign="center" image style={{ width: "100%" }}>
          <Image centered src={logo} size="tiny" />
          <br />
          <Header.Content style={{ color: "white" }}>LogIn</Header.Content>
        </Header>
        <Divider horizontal clearing />
        {/* Form part */}
        <Form>
          <Form.Input
            fluid
            type="text"
            icon="user"
            iconPosition="left"
            placeholder="E-mail address"
            required
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            type="password"
            required
          />
          <Button color="blue" fluid size="large">
            LogIn
          </Button>
        </Form>

        <Divider clearing horizontal style={{ color: "white" }}>
          Or
        </Divider>
        {/* Other Button */}
        <Button color="green" fluid size="large">
          SignIn
        </Button>
      </Container>
    );
  }
}
export default Login;

/**
 * 
// import Login from "./js/components/Login";
       page for login and signup 
  
    <Grid style={{ height: "100vh" }} centered verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Login />
        </Grid.Column>
      </Grid> 
*/
