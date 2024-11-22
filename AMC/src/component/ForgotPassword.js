
import React from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";
import logo from "../assets/forpass1.png";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleSendEmail = (e) => {
    e.preventDefault();
    navigate("/verify-code"); 
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <img src={logo} alt="Logo" className="forgot-password-logo" />
        <h2>Forgot your password?</h2>
        <p>Enter your email address to reset your password.</p>
        <form className="forgot-password-form" onSubmit={handleSendEmail}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              className="forgot-password-input"
              required
            />
          </div>
          <button type="submit" className="forgot-password-button">
            Send Email
          </button>
        </form>
        <a href="/login" className="forgot-password-back-link">
          &larr; Back to Login
        </a>
      </div>
    </div>
  );
};

export default ForgotPassword;
