import React, { Component } from "react";
import axios from "../axios/axios";
import { Link } from "react-router-dom";
import { Form, Container, Button, Segment } from "semantic-ui-react";

const loading = {
  margin: "1em",
  fontSize: "24px"
};

const title = {
  pageTitle: "Password Reset Screen"
};

export default class ResetPassword extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    update: false,
    isLoading: true,
    error: false
  };

  async componentDidMount() {
    console.log(this.props);
    console.log(this.props.match.params.token);
    await axios
      .get("/reset", {
        params: {
          resetPasswordToken: this.props.match.params.resetPasswordToken
        }
      })
      .then(response => {
        console.log(response);
        if (response.data.message === "password reset link a-ok") {
          this.setState({
            email: response.data.email,
            update: false,
            isLoading: false,
            error: false
          });
        } else {
          this.setState({
            update: false,
            isLoading: false,
            error: true
          });
        }
      })
      .catch(error => {
        console.log(error.data);
      });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  updatePassword = e => {
    e.preventDefault();
    axios
      .put("/updatePasswordViaEmail", {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        console.log(response.data);
        if (response.data.message === "password updated") {
          this.setState({
            updated: true,
            error: false
          });
        } else {
          this.setState({
            updated: false,
            error: true
          });
        }
      })
      .catch(error => {
        console.log(error.data);
      });
  };

  render() {
    const { password, error, isLoading, updated } = this.state;
    const resetPasswordToken = this.props.match.params.token;

    if (error) {
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
          <h4>
            Şifre yenilemede problem yaşanmaktadır. Lütfen tekrar yenileme linki
            gönderin
          </h4>
          <Button
            style={{
              width: "100%",
              margin: "15px 50px 10px 0px"
            }}
            color="teal"
            type="submit"
          >
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to="/şifreyenileme"
            >
              Şifremi Unuttum
            </Link>
          </Button>
        </Container>
      );
    } else {
      return (
        <Container
          style={{
            backgroundColor: "white",
            boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            width: "50%",
            borderRadius: "5px",
            height: updated ? "400px" : "270px",
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
            />
            <Form.Input
              label="Şifre"
              placeholder="Şifre"
              password="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <Button
              style={{ width: "100%", margin: "15px 50px 10px 0px" }}
              color="teal"
              type="submit"
              onClick={this.updatePassword}
            >
              Şifre Güncelle
            </Button>
          </Form>
          {updated && (
            <div>
              <Segment>
                Şifreniz başarılı bir şekilde değiştirilmiştir. Lütfen tekrar
                giriş yapınız
              </Segment>

              <Button
                style={{
                  width: "100%",
                  margin: "15px 50px 10px 0px"
                }}
                color="teal"
                type="submit"
              >
                <Link
                  style={{ color: "white", textDecoration: "none" }}
                  to="/girişyap"
                >
                  Giriş Yap
                </Link>
              </Button>
            </div>
          )}
        </Container>
      );
    }
  }
}
