import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./ForgotPassword.css";
import "./VerifyCode.css";
import logo1 from "../assets/forpass1.png";
import logo from "../assets/verify.png";

const ForgotPasswordAndVerify = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // State for both ForgotPassword and VerifyCode functionalities
  const [email, setEmail] = useState(location.state?.email || "");
  const [code, setCode] = useState(Array(6).fill("")); // Array to store 6 digits
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState(location.pathname.includes("verify-code") ? "verify" : "forgot");

  // Handle Forgot Password submission
  const handleForgotPasswordSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/forgot-password", { email });
      if (response.status === 200) {
        setMessage("A verification code has been sent to your email address.");
        setError("");
        setTimeout(() => setStep("verify"), 2000); // Move to the verify step after delay
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to send verification code. Please try again.";
      setError(errorMsg);
      setMessage("");
    }
  };

  // Handle Code Verification submission
  const handleVerifySubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/verify-code", { email, code: code.join("") });
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

  // Handle input changes for the verification code
  const handleCodeChange = (value, index) => {
    const updatedCode = [...code];
    updatedCode[index] = value.slice(0, 1); // Only allow one digit
    setCode(updatedCode);

    // Automatically move to the next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        {step === "forgot" && (
          <>
            <img src={logo1} alt="Logo" className="forgot-password-logo" />
            <h2>Forgot your password?</h2>
            <p>Enter your email address to reset your password.</p>
            <form className="forgot-password-form" onSubmit={handleForgotPasswordSubmit}>
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Email"
                  className="forgot-password-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="forgot-password-button">
                Send Verification Code
              </button>
            </form>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
            <a href="/login" className="forgot-password-back-link">
              &larr; Back to Login
            </a>
          </>
        )}

        {step === "verify" && (
          <>

<img src={logo} alt="Logo" className="forgot-password-logo" />

            <h2>Verify Your Code</h2>
            <p>A verification code was sent to <strong>{email}</strong>.</p>
            <form className="verify-code-form" onSubmit={handleVerifySubmit}>
              <div className="code-input-group">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    id={`code-input-${index}`}
                    type="text"
                    maxLength="1"
                    className="verify-code-square"
                    value={digit}
                    onChange={(e) => handleCodeChange(e.target.value, index)}
                    required
                  />
                ))}
              </div>
              <button type="submit" className="verify-code-button">
                Verify Code
              </button>
            </form>
            {/* {message && <p className="success-message">{message}</p>} */}
            {error && <p className="error-message">{error}</p>}
            <a onClick={() => setStep("forgot")} className="verify-code-back-link">
              &larr; Back to Forgot Password
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordAndVerify;
