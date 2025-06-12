import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import HealthTips from "./components/HealthTips";
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <Router>
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1 p-3 bg-dark text-light" style={{ minHeight: "100vh" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/health-tips" element={<HealthTips />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
