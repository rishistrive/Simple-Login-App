import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signupUser } from "../Thunk/userThunk";
import { signupFormField } from "../utils";

export default function Signup() {
  const dispatch = useDispatch();
  const history = useHistory();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      e.target.names.value &&
      e.target.password.value &&
      e.target.email.value &&
      e.target.city.value
    ) {
      await dispatch(
        signupUser({
          name: e.target.names.value,
          password: e.target.password.value,
          email: e.target.email.value,
          city: e.target.city.value,
        })
      );
      history.push("/login");
    }
  };
  return (
    <div className="col-3 mx-auto">
      <br />
      <h1>Signup Page</h1>
      <br />
      <br />
      <Container>
        <Form onSubmit={submitHandler}>
          {signupFormField.map((field) => (
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>{field.label}</Form.Label>
              <Form.Control
                type={field.type}
                placeholder={field.placeholder}
                name={field.name}
              />
            </Form.Group>
          ))}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}
