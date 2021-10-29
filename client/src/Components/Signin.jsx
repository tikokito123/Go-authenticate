import React, { Component } from "react";
import * as yup from "yup";
import { Modal, Form, Button } from "react-bootstrap";
class Signin extends React.Component {
  state = {
    show: false,
  };

  handleShow = () => this.setState({ show: true });
  handleClose = () => {
    this.setState({ show: false });
    return <h1>test</h1>
};

  handleSubmit = async (e) => {
    e.preventDefault();

    const userSchema = yup.object().shape({
      username: yup
        .string()
        .required("Please enter a valid username")
        .min("must have at least 6 letters"),
      password: yup
        .string()
        .required("please enter a password")
        .min("password must contain at least 6 characters"),
    });

    const { username, password } = this.state;
    const user = {
      username,
      password,
    };

    const isValid = await userSchema.isValid(user);

    if (!isValid) return alert("please enter a valid params");

    const res = await fetch("/users/sign-in", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: this.state,
    });
    const json = await res.json();
    console.log(json);
  };

  HandleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const signIn = (
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign in!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="emai"
                type="email"
                placeholder="Enter email"
                onChange={this.HandleChange}
              />
              <Form.Text className="text-muted">
                We'll never share your email/password with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                onChange={this.HandleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <Button
            onClick={this.handleClose}
            className="mt-2 bg-warning"
          >
            not a user? create an account
          </Button>
        </Modal.Body>
      </Modal>
    );
    return (
      <div>
        <Button onClick={this.handleShow} variant="primary" className="m-3">
          Sign In!
        </Button>
        {signIn}
      </div>
    );
  }
}

export default Signin;
