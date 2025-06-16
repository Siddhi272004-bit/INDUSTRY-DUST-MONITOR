import React, { useState } from "react";
import "./LoginRegister.css";
import { useNavigate } from "react-router-dom";

function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "login" : "register";
    const payload = isLogin
      ? { email: form.email, password: form.password }
      : form;

    try {
      const res = await fetch(`http://localhost:3001/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      if (isLogin) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.user.username);
        localStorage.setItem("email", data.user.email);
        navigate("/"); // go to dashboard
      } else {
        alert("🎉 Registration successful!");
        setIsLogin(true);
      }
    } catch (err) {
      alert("Something went wrong");
    }
  };

  return (
    <div className="container">
      <div className={`form-box ${isLogin ? "login" : "register"}`}>
        <form id={isLogin ? "login-form" : "register-form"} onSubmit={handleSubmit}>
          <h1>{isLogin ? "Login" : "Register"}</h1>
          {!isLogin && (
            <div className="input-box">
              <input
                type="text"
                name="username"
                placeholder="Username"
                required
                value={form.username}
                onChange={handleChange}
              />
            </div>
          )}
          <div className="input-box">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <button className="btn" type="submit">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
      </div>

      <div className="toggle-box">
        <h1>{isLogin ? "Hello, Welcome!" : "Welcome back!"}</h1>
        <p>{isLogin ? "Don't have an account?" : "Already have an account?"}</p>
        <button
          className="btn"
          onClick={() => setIsLogin((prev) => !prev)}
        >
          {isLogin ? "Register" : "Login"}
        </button>
      </div>
    </div>
  );
}

export default LoginRegister;
