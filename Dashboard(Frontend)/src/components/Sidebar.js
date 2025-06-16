import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function Sidebar() {
  const username = localStorage.getItem("username") || "Anonymous User";
  const email = localStorage.getItem("email") || "anonymous@clean";

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "http://localhost:3000/first.html";
  };

  return (
    <div
      className="text-white d-flex flex-column justify-content-between ps-2"
      style={{ width: "250px", minHeight: "100vh", backgroundColor: 'rgba(60, 57, 57, 0.93)' }}
    >
      <div>
        <h4 className="my-4 mx-2 mb-4">DUST</h4>
        <h4 className="my-4 mx-2 mb-2">MONITOR</h4>
        <Nav defaultActiveKey="/dashboard" className="flex-column">
          <hr className="bg-light" />
          <Nav.Link as={Link} to="/" className="text-white">Dashboard</Nav.Link>
          <Nav.Link as={Link} to="/health-tips" className="text-white">Health Tips</Nav.Link>
          <Nav.Link as={Link} to="/contact" className="text-white">Contact</Nav.Link> 
        </Nav>
      </div>

      <div className="p-2">
        <div className="d-flex align-items-center">
          <img
            src="https://avatar.iran.liara.run/public"
            alt="avatar"
            className="rounded-circle me-2"
            style={{ height: "40px", width: "40px" }}
          />
          <div>
            <strong>{username}</strong>
            <div style={{ fontSize: "0.8rem", color: "white" }}>{email}</div>
          </div>
        </div>
        <Nav.Link onClick={handleLogout} className="text-white mt-2">Sign Out</Nav.Link>
      </div>
    </div>
  );
}

export default Sidebar;
