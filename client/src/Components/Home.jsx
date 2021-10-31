import React from "react";
import { Container, Button, Collapse, Card } from "react-bootstrap";
import "./css/home.css";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
class Home extends React.Component {
  state = {
    open: false,
  };

  render() {
    return (
      <Container className="pt-5 m-auto">
        <Button
          id="home-button"
          className="d-flex m-auto text-center"
          variant="outline-dark"
          onClick={() => this.setState({ open: !this.state.open })}
          aria-controls="example-collapse-text"
          aria-expanded={this.state.open}
        >
          TikoWeb
        </Button>
        <div className="mt-5 d-flex align-items-center justify-content-center">
          <Collapse className="" in={this.state.open} dimension="height">
            <div id="text-dark">
              <Card
                body
                style={{
                  color: "black",
                  width: "500px",
                  border: "solid 3px black",
                  borderRadius: "15px",
                }}
              >
                <SimpleBar style={{ maxHeight: "50vh" }}>
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. Nihil anim keffiyeh
                  helvetica, craft beer labore wes anderson cred nesciunt
                  sapiente ea proident. Anim pariatur cliche reprehenderit, enim
                  eiusmod high life accusamus terry richardson ad squid. Nihil
                  anim keffiyeh helvetica, craft beer labore wes anderson cred
                  nesciunt sapiente ea proident. Anim pariatur cliche
                  reprehenderit, enim eiusmod high life accusamus terry
                  richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                  labore wes anderson cred nesciunt sapiente ea proident. Anim
                  pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. Nihil anim keffiyeh
                  helvetica, craft beer labore wes anderson cred nesciunt
                  sapiente ea proident. Anim pariatur cliche reprehenderit, enim
                  eiusmod high life accusamus terry richardson ad squid. Nihil
                  anim keffiyeh helvetica, craft beer labore wes anderson cred
                  nesciunt sapiente ea proident.
                  a proident. Anim pariatur cliche reprehenderit, enim
                  eiusmod high life accusamus terry richardson ad squid. Nihil
                  anim keffiyeh helvetica, craft beer labore wes anderson cred
                  nesciunt sapiente ea proident.
                  a proident. Anim pariatur cliche reprehenderit, enim
                  eiusmod high life accusamus terry richardson ad squid. Nihil
                  anim keffiyeh helvetica, craft beer labore wes anderson cred
                  nesciunt sapiente ea proident.
                  a proident. Anim pariatur cliche reprehenderit, enim
                  eiusmod high life accusamus terry richardson ad squid. Nihil
                  anim keffiyeh helvetica, craft beer labore wes anderson cred
                  nesciunt sapiente ea proident.
                  a proident. Anim pariatur cliche reprehenderit, enim
                  eiusmod high life accusamus terry richardson ad squid. Nihil
                  anim keffiyeh helvetica, craft beer labore wes anderson cred
                  nesciunt sapiente ea proident.

                </SimpleBar>
              </Card>
            </div>
          </Collapse>
        </div>
                
      </Container>
    );
  }
}

export default Home;
