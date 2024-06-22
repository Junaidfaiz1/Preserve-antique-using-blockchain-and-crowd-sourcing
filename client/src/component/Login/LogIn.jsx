import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "../Login/Login.css";
import Navbar from "../Navbar/Navbar.jsx";
import { loginUser } from "../../utilities/interact.js";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const history = useNavigate(); 
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const success = await loginUser(email, password);
      
      if (success) {
        window.localStorage.setItem("token",JSON.stringify({user:true}))
        history("/"); // Redirect to home page upon successful login
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Error logging in. Please try again later.");
    }
  };

  return (
    <div>
      <Navbar />
      <h3 className="text-center mt-5">Welcome Back</h3>
      <div className="Login d-flex justify-content-center align-items-center templete w-100 vh-50 bg-white mt-5">
        <div className="w-50 p-5 rounded border border-dark" id="Login-border">
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="text-danger mb-2">{error}</div>}
            <div className="text-center mb-3">
              <a
                className="text-decoration-none link-secondary"
                id="Forgetpassword"
                href="/"
              >
                Forgot Password
              </a>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-secondary">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
