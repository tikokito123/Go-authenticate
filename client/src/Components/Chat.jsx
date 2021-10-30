import React from "react";
import {
  Row,
  Col,
  Badge,
  Container,
  FormControl,
  Form,
  InputGroup,
  Button,
} from "react-bootstrap";

class Chat extends React.Component {
  handleNavColor = () => {
    document.getElementById("mainnavbar").className =
      "navbar navbar-expand-lg navbar-light bg-light p-4 rounded";
  };

  handleSubmit = e => {
    e.preventDefault();
    
    //fetching
  }

  componentDidMount() {
    this.handleNavColor();
  }
  render() {
    return (
      <div
        className="text-dark bg-dark float-left"
        style={{ position: "relative",overflow: "auto", height: "100vh" }}
      >
        <Container className="m-5 p-5 bg-dark float-left overflow-auto border border-light rounded">
          <Row>
            <Col className=" mx-5 col-16 col-md-6 bg-info display-6">
              <Badge bg="danger" className="me-3 text-white font-weight-bold">
                Ido:{" "}
              </Badge>
              I never thought I would ever say this but for the first time Good
              we are doing good right I dont know let me guess you are still
              into her? Ido: I never thought I would ever say this but for the
              first time Good we are doing good right I dont know let me guess
              you are still into her? Ido: I never thought I would ever say this
              but for the first time Good we are doing good right I dont know
              let me guess you are still into her? Ido: I never thought I would
              ever say this but for the first time Good we are doing good right
              I dont know let me guess you are still into her? Ido: I never
              thought I would ever say this but for the first time Good we are
              doing good right I dont know let me guess you are still into her?
              Ido: I never thought I would ever say this but for the first time
              Good we are doing good right I dont know let me guess you are
              still into her?
            </Col>
          </Row>
          <InputGroup className="mb-2 mt-5">
            <FormControl name="message" id="inlineFormInputGroup" placeholder="message text" />
            <InputGroup.Text>
              <Button variant="outline-success" onClick={this.handleSubmit}>Send</Button>
            </InputGroup.Text>
          </InputGroup>
        </Container>
      </div>
    );
  }
}

export default Chat;
