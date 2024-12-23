import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./VerifyCode.css";

const VerifyCode = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Use the email from the location state or an empty string as a fallback
  const [email, setEmail] = useState(location.state?.email || "");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleVerify = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/verify-code", {
        email,
        code,
      });

      if (response.status === 200) {
        setMessage("Code verified successfully! Redirecting...");
        setError("");
        setTimeout(() => navigate("/password-reset", { state: { email } }), 2000);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Invalid code. Please try again.";
      setError(errorMsg);
      setMessage("");
    }
  };

  return (
    <div className="verify-code-container">
      <div className="verify-code-box">
        <h2>Verify Your Code</h2>
        <p>Enter the verification code sent to your email.</p>
        <form className="verify-code-form" onSubmit={handleVerify}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Enter Your Email"
              className="verify-code-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter Verification Code"
              className="verify-code-input"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="verify-code-button">
            Verify Code
          </button>
        </form>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
        <a href="/forgot-password" className="verify-code-back-link">
          &larr; Back to Forgot Password
        </a>
      </div>
    </div>
  );
};

export default VerifyCode;
