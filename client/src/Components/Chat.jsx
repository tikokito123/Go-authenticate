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
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import Cookies from 'js-cookie';
class Chat extends React.Component {

  state = {
    message: '',
    username: '',
  }

  fetchUser = () => {
    
  }

  handleNavColor = () => {
    document.getElementById("mainnavbar").className =
      "navbar navbar-expand-lg navbar-light bg-light p-4 rounded";
  };
  
  handleSubmit = (e) => {
    e.preventDefault();

    //fetching message...
  };

  socketConnection = () => {
    let socket = new WebSocket("ws://localhost/ws");
    console.log("attemting to connect to socket");

    socket.onopen = () => {
      console.log("connected!");
      //todo send user text
      

      socket.send("Hi from client");
    };

    socket.onclose = (e) => {
      console.log("socket closed connection: ", e);
    };

    socket.onerror = (e) => {
      console.error("failed to connect to socket. socket Error: ", e);
    };
  };

  componentDidMount() {
    this.handleNavColor();
    this.socketConnection();
    this.fetchUser();
  }
  render() {
    return (
      <div
        className="text-dark bg-dark float-left"
        style={{ position: "relative", overflow: "auto", height: "100vh" }}
      >
        <Container
          className="m-5 p-5 bg-dark float-left overflow-hidden border border-light rounded"
          style={{ maxHeight: "80vh" }}
        >
          <SimpleBar style={{maxHeight: "60vh", overflowX: "hidden", overflowY: "auto"}}>
            <Row>
              <Col className=" mx-5 col-16 col-md-6 bg-info display-6">
                <Badge bg="danger" className="me-3 text-white font-weight-bold">
                  Ido:{" "}
                </Badge>
                I never thought I would ever say this but for the first time
                Good we are doing good right I dont know let me guess you are
                still into her? Ido: I never thought I would ever say this but
                for the first time Good we are doing good right I dont know let
                me guess you are still into her? Ido: I never thought I would
                ever say this but for the first time Good we are doing good
                right I dont know let me guess you are still into her? Ido: I
                never thought I would ever say this but for the first time Good
                we are doing good right I dont know let me guess you are still
                into her? Ido: I never thought I would ever say this but for the
                first time Good we are doing good right I dont know let me guess
                you are still into her? Ido: I never thought I would ever say
                this but for the first time Good we are doing good right I dont
                know let me guess you are still into her?
              </Col>
            </Row>
                </SimpleBar>
            <Form onSubmit={this.handleSubmit}>
              <InputGroup className="mb-2 mt-5">
                <FormControl
                  name="message"
                  id="inlineFormInputGroup"
                  placeholder="message text"
                />
                <InputGroup.Text>
                  <Button variant="outline-success" type="submit">
                    Send
                  </Button>
                </InputGroup.Text>
              </InputGroup>
            </Form>
        </Container>
      </div>
    );
  }
}

export default Chat;
