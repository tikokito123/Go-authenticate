import Button from "@restart/ui/esm/Button";
import React from "react";
import {Toast, ToastContainer} from 'react-bootstrap'
class EnterChat extends React.Component {
  render() {
    return (
      <div>
        <ToastContainer>
          <Toast>
            <Toast.Header>
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
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Bootstrap</strong>
              <small className="text-muted">2 seconds ago</small>
            </Toast.Header>
            <Toast.Body>Heads up, toasts will stack automatically</Toast.Body>
          </Toast>
            <Button>Connect To Chat</Button>
        </ToastContainer>
      </div>
    );
  }
}

export default EnterChat;
