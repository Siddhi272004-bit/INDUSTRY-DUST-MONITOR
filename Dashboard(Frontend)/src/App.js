import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import HealthTips from "./components/HealthTips";
import 'leaflet/dist/leaflet.css';
import Chatbot from "./components/chatbot"; 
import Contact from "./components/Contact"; 

function App() {
  return (
    <Router>
      <div className="d-flex" style={{backgroundColor: "#15191E"}}>
        <Sidebar />
        <div className="flex-grow-1 p-3 bg-dark text-light" style={{ minHeight: "100vh", position: "relative" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/health-tips" element={<HealthTips />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Chatbot />
        </div>
      </div>
    </Router>
  );
}

export default App;
