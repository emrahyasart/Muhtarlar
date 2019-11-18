import React from "react";
import { connect } from "react-redux";
import { Form, Container, Button } from "semantic-ui-react";
import { resetPassword } from "../actions/userAction";

class ForgotPassword extends React.Component {
  state = {
    email: "",
    statusEmail: false
  };

  handleChange = e => {
    e.preventDefault();
    const { email } = this.state;
    this.setState({ [e.target.name]: e.target.value });
    email !== "" && this.setState({ statusEmail: false });
  };

  onSubmit = () => {
    const { email } = this.state;
    const data = { requestedEmail: email };
    email === ""
      ? this.setState({ statusEmail: true })
      : this.props.resetPassword(email, data);
  };

  render() {
    return (
      <Container
        style={{
          backgroundColor: "white",
          boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          width: "50%",
          borderRadius: "5px",
          height: "200px",
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

          <Button
            style={{ width: "100%", margin: "15px 50px 10px 0px" }}
            color="teal"
            type="submit"
            onClick={this.onSubmit}
          >
            Email Gönder
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

export default connect(mapStateToProps, { resetPassword })(ForgotPassword);
