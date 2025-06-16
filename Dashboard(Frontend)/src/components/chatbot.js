import React, { useState } from "react";
import "./Chatbot.css"; // style file we'll create next

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I'm your weather assistant. Ask me anything about weather conditions, forecasts, or air quality." }
  ]);
  const [input, setInput] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();

    setMessages([...messages, { sender: "user", text: userMsg }]);
    setInput("");

    try {
      const res = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.response }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, I'm having trouble right now." }
      ]);
    }
  };

  return (
    <>
      {/* Floating Icon */}
      <div className="chatbot-icon" onClick={() => setIsOpen(!isOpen)}>
        <img src="chb.png" alt="Chatbot Icon" className="chatbot-image" />
      </div>


      {/* Popup Chat Window */}
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            Weather Assistant
            <button className="close-btn" onClick={toggleChat}>×</button>
          </div>

          <div className="chatbot-body">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.sender}-message`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              placeholder="Ask about weather..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
