// Sidebar.js
import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";  

function Sidebar() {
  return (
    <div className="text-white" style={{ width: "250px", minHeight: "100vh", backgroundColor: 'rgba(60, 57, 57, 0.93)' }}>
      <h4 className="my-4 mx-2 mb-4">DUST</h4>
      <h4 className="my-4 mx-2 mb-2">MONITOR</h4>
      <Nav defaultActiveKey="/dashboard" className="flex-column">
        <hr className="bg-light" />
   
        <Nav.Link as={Link} to="/" className="text-white">Dashboard</Nav.Link>
        <Nav.Link as={Link} to="/health-tips" className="text-white">Health Tips</Nav.Link>

        <div className="mt-4">
          <div className="d-flex align-items-center">
            <img
              src="https://avatar.iran.liara.run/public"
              alt="avatar"
              className="rounded-circle my-2 mx-2 me-2"
              style={{ height: "40px", width: "40px" }}
            />
            <div>
              <strong>Anonymous User</strong>
              <div className="text-muted" style={{ fontSize: "0.8rem" }}>anonymous@clean</div>
            </div>
          </div>
          <Nav.Link href="#" className="text-white">Sign Out</Nav.Link>
        </div>
      </Nav>
    </div>
  );
}

export default Sidebar;
