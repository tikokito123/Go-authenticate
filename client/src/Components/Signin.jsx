import React, { Component } from "react";
import { Modal, Form, Button } from "react-bootstrap";
class Signin extends React.Component {
  state = {
    show: true,
  };

  handleShow = () => this.setState({ show: true });
  handleClose = () => this.setState({ show: false });

  handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/users/sign-in", {
      method: "POST",
      headers: {},
      body: this.state,
    });
    const json = await res.json();
    console.log(json);
  };

  HandleChange = e => {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value}) 
}

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
              <Form.Control name="emai" type="email" placeholder="Enter email" onChange={this.HandleChange}/>
              <Form.Text className="text-muted">
                We'll never share your email/password with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control name="password" type="password" placeholder="Password" onChange={this.HandleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    )
    return (
      <div>{signIn}</div>
    );
  }
}

export default Signin;
