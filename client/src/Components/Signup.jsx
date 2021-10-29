import React, { Component } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import * as yup from 'yup'
import DatePicker from 'react-datepicker'

import "react-datepicker/dist/react-datepicker.css";

class Signup extends React.Component {
  state = {
    show: false,
    date: new Date()
  };



  schema = yup.object().shape({
    username: yup.string().required('please enter a username!').min(6, "password must be longer than 6 characters!"),
    password: yup.string().required("please provide a valid password"),
    email: yup.string().email(),
    birth: yup.date().required(),
  });

  handleShow = () => this.setState({ show: true });
  handleClose = () => this.setState({ show: false });

  handleSubmit = async (e) => {
    e.preventDefault();
    const {password, confirmPassword, username, email, date} = this.state;
    if(confirmPassword !== password) return alert("password do not mutch!");
    const user = {
      username,
      email,
      password,
      confirmPassword,
      date
    }
    
    const userSchema = yup.object().shape({
      username: yup.string().required(),
      email: yup.string().required().email(),
      password: yup.string().required().min(6, "characters must have at least 6 chars"),
      confirmPassword: yup.string().required(),
      date: yup.date().required()
    })

    const isValid = await userSchema.isValid(user);
    if (!isValid) return alert("You didn't fill the fields as required!")

    const res = await fetch("/users/create", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(this.state),
    });
    const json = await res.json();
    console.log(json);
  };
  
  HandleChange = e => {
      e.preventDefault();
      this.setState({[e.target.name]: e.target.value})
  }

  render() {
    const signUp = (
        <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control name="email" required type="email" placeholder="Enter email" onChange={this.HandleChange}/>
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group  className="mb-3" controlId="username">
              <Form.Label >Username</Form.Label>
              <Form.Control name="username" required placeholder="Username" onChange={this.HandleChange}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label >Password</Form.Label>
              <Form.Control name="password" type="password" required placeholder="Password" onChange={this.HandleChange}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm Passoword</Form.Label>
              <Form.Control name="confirmPassword" type="password" required placeholder="Confirm password" onChange={this.HandleChange}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="checkBox">
              <Form.Check name="checkBox" type="checkbox" label="Check me out" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="birth">
              <Form.Label >Birth</Form.Label>
                <DatePicker 
                selected={this.state.date}
                onChange={date => this.setState({date})}
                showTimeSelect
                dateFormat="Pp"
                ></DatePicker>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    )
    return (
      <div>
         <Button onClick={this.handleShow} variant="light" className="m-4">Sign up!</Button>
         {signUp}
      </div>
    );
  }
}

export default Signup;
