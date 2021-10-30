import React from "react";
import { Container, Toast, ToastContainer, Button } from "react-bootstrap";
class EnterChat extends React.Component {
  render() {
    return (
      <Container className="text-center">
        <ToastContainer className="p-5 ml-5">
          <Toast className="mb-5">
            <Toast.Header closeButton={false}>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Bootstrap</strong>
              <small className="text-muted">just now</small>
            </Toast.Header>
            <Toast.Body>See? Just like this.</Toast.Body>
          </Toast>
          <Toast>
            <Toast.Header closeButton={false}>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Bootstrap</strong>
              <small className="text-muted">2 seconds ago</small>
            </Toast.Header>
            <Toast.Body>Why is it just me?</Toast.Body>
          </Toast>
        </ToastContainer>
        <Button variant="outline-dark" className="mt-5 text-danger border border-dark outline-primary" size="lg" href="/chat">Connect To Chat</Button>
      </Container>
    );
  }
}

export default EnterChat;
