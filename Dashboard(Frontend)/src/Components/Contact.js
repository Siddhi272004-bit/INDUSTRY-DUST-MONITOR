import React from "react";
import "./Contact.css";

function Contact() {
  return (
    <div className="contact-container">
      <h2>Contact Us</h2>

      <div className="card-contact">
        <h4>Name</h4>
        <p>Samridhi Sinha <br></br> Siddhi</p>
      </div>

      <div className="card-contact">
        <h4>Email</h4>
        <p>s51741248@gmail.com</p>
      </div>

      <div className="card-contact">
        <h4>GitHub</h4>
        <a href="https://github.com/Samridhi024" target="_blank" rel="noreferrer">
          Visit GitHub (Samridhi)
        </a>
        <br></br>
        <a href="https://github.com/Siddhi272004-bit" target="_blank" rel="noreferrer">
          Visit GitHub (Siddhi)
        </a>
      </div>
    </div>
  );
}

export default Contact;
