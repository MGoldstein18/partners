import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function Sign_in_form(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function changeEmail(e) {
    setEmail(e.target.value);
  }

  function changePassword(e) {
    setPassword(e.target.value);
  }

  function submit(e) {
    e.preventDefault();

    alert(email + password);

    newSignIn = {
      email: email,
      password: password,
    };
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <h3 id="headingSign">Sign In</h3>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={submit}>
          <Form.Group>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={changeEmail}
              autoComplete="none"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={changePassword}
              autoComplete="none"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="submit"
              value="Submit and Sign In"
              className="btn btn-success"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Sign_in(props) {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Button
        className="shadow-lg p-3 m-5 btn-lg"
        variant="warning"
        onClick={() => setModalShow(true)}
        style={{ color: "#AC2020" }}
      >
        Sign In
      </Button>

      <Sign_in_form show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}

export default Sign_in;
