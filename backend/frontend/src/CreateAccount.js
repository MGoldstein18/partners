import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function CreateAccountForm(props) {
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
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <h3>Create Account</h3>
      </Modal.Header>

      <Modal.Body>
        <Form>
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
              value="Submit and Create Account"
              className="btn btn-success"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

function CreateAccount(props) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button
        className="shadow-lg p-3 m-5 btn-lg"
        variant="warning"
        onClick={() => setModalShow(true)}
        style={{ color: "#AC2020" }}
      >
        Create Account
      </Button>
      <CreateAccountForm show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}

export default CreateAccount;
