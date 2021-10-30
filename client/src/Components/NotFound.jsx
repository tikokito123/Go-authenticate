import React from "react";
import { Badge, Alert, Container } from "react-bootstrap";
export default function NotFound() {
  const redirect = () => {
    setTimeout(() => window.location.replace("http://localhost:3000/"), 5000);
  };
  return (
    <Container className="m-auto text-center font-weight-bold position-absolute top-50 start-50 translate-middle display-1">
      <header>
        <h1 className="mb-5 display-1 text-weight-bold">TikoWeb</h1>
      </header>
      <div className="">
        <Badge className="mb-5 text-warning" bg="danger">
          404
        </Badge>

        <h1>
          <Alert key="alert" variant="secondary" className="d-inline-block w-50">
            The page you were looking for Not Found!
          </Alert>
        </h1>
        <span className="text-warning display-6">
          you will be redirect in 5 seconds
        </span>
      </div>
      {redirect()}
    </Container>
  );
}
