// src/components/LoginPromptModal.js
import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

function LoginPromptModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) setShow(true);
  }, []);

  const redirectToAuth = () => {
    window.location.href = "/first.html"; // Assumes it's in public folder
  };

  return (
    <Modal
      show={show}
      backdrop="static"
      keyboard={false}
      centered
      contentClassName="custom-dark-modal"
    >
      <Modal.Header className="bg-dark text-light border-0">
        <Modal.Title className="mx-auto">🔐 Access Required</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-light text-center">
        You must log in or register to use the Dashboard.
      </Modal.Body>
      <Modal.Footer className="bg-dark border-0 justify-content-center">
        <Button
          variant="outline-light"
          style={{ borderRadius: "25px", padding: "8px 20px" }}
          onClick={redirectToAuth}
        >
          Go to Login / Register
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LoginPromptModal;
