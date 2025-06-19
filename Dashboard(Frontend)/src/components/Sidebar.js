import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import dashboardIcon from "./dashb.png";
import tipsIcon from "./ht.png";
import contactIcon from "./cont.png";

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
      style={{ width: "250px", minHeight: "100vh", backgroundColor: "#1B252B" }}
    >
      <div>
        <h2 className="my-4 mx-2 mb-4">DUST</h2>
        <h2 className="my-4 mx-2 mb-2">MONITOR</h2>
        <Nav defaultActiveKey="/dashboard" className="flex-column">
          <Nav.Link as={Link} to="/" className="text-white d-flex align-items-center mb-3">
            <img src={dashboardIcon} alt="Dashboard" style={{ width: "24px", marginRight: "10px" }} />
            Dashboard
          </Nav.Link>

          <Nav.Link as={Link} to="/health-tips" className="text-white d-flex align-items-center mb-3">
            <img src={tipsIcon} alt="Health Tips" style={{ width: "24px", marginRight: "10px" }} />
            Health Tips
          </Nav.Link>

          <Nav.Link as={Link} to="/contact" className="text-white d-flex align-items-center mb-3">
            <img src={contactIcon} alt="Contact" style={{ width: "24px", marginRight: "10px" }} />
            Contact
          </Nav.Link>
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

