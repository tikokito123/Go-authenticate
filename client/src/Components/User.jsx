import React from "react";
import Signup from "./Signup";
import Signin from "./Signin";
import { Container, Toast } from "react-bootstrap";
//import "../css/main.css";

export default function Register() {
  return (
    <div>
      <Toast bg="dark" className="text-light position-absolute top-50 start-50 translate-middle text-center m-auto justify-content-center">
        <Toast.Header closeButton={false} className="bg-success text-dark">
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="m-auto display-6 p-2 font-weight-bold">Twogether</strong>
        </Toast.Header>
        <Toast.Body>
          Welcome, :).
          <Signin />
          <Signup />
        </Toast.Body>
      </Toast>
    </div>
  );
}
