import React from "react";
import { connect } from "react-redux";
import { Form, Container, Button } from "semantic-ui-react";
import { fetchUserByEmail } from "../actions/userAction";
import { signIn } from "../actions/signinAction";

class SignIn extends React.Component {
  state = {
    email: "",
    password: "",
    statusEmail: false,
    statusPassword: false
  };

  componentDidMount() {
    console.log(this.props.currentUser);
  }

  handleChange = e => {
    const { email, password } = this.state;
    this.setState({ [e.target.name]: e.target.value });
    email && this.setState({ statusEmail: false });
    password && this.setState({ statusPassword: false });
  };

  onSubmit = e => {
    const { email, password, statusEmail, statusPassword } = this.state;
    if (!email && !password) {
      this.setState({ statusEmail: true, statusPassword: true });
    } else if (!email) {
      this.setState({ statusEmail: true });
    } else if (!password) {
      this.setState({ statusPassword: true });
    }

    const info = {
      email: email,
      password: password
    };

    password &&
      email &&
      this.props.fetchUserByEmail(email).then(() => {
        const info = {
          email: email,
          password: password
        };
        this.props.signIn(info);

        console.log(info);
      });
  };

  render() {
    return (
      <Container
        style={{
          backgroundColor: "white",
          boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          width: "50%",
          borderRadius: "5px",
          height: "270px",
          padding: "30px 15px 30px 15px",
          marginTop: "250px"
        }}
      >
        <Form>
          <Form.Input
            label="Email"
            placeholder="Email"
            email="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            error={this.state.statusEmail}
          />
          <Form.Input
            label="Şifre"
            placeholder="Şifre"
            password="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            error={this.state.statusPassword}
          />
          <Button
            style={{ width: "100%", margin: "15px 50px 10px 0px" }}
            color="teal"
            type="submit"
            onClick={this.onSubmit}
          >
            Giriş Yap
          </Button>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

export default connect(
  mapStateToProps,
  { fetchUserByEmail, signIn }
)(SignIn);
