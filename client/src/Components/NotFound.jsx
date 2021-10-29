import React from "react";
import { Badge, Alert } from "react-bootstrap";
export default function NotFound() {
  const redirect = () => {
    setTimeout(() =>
    window.location.replace("http://localhost:3000/"), 5000);
  };
  return (
    <div className="m-auto text-center p-3">
      <h1 className="">TikoWeb</h1>
      <div className="m-auto m-auto text-center font-weight-bold  position-absolute top-50 start-50 translate-middle display-1">
        <Badge className="m-5 p-3 text-warning" bg="danger">
          404
        </Badge>

        <h1>
          <Alert key="alert" variant="secondary">
            The page you were looking for Not Found!
          </Alert>
        </h1>
        <span className="text-muted display-6">you will be redirect in 5 seconds</span>
      </div>
      {redirect()}
    </div>
  );
}
