import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./VerifyCode.css";
import logo from "../assets/verify.png";

const VerifyCode = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (value, index) => {
    if (/^[0-9]*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (value && index < code.length - 1) document.getElementById(`input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && !code[index]) {
      document.getElementById(`input-${index - 1}`).focus();
    }
  };

  const handleVerify = async (event) => {
    event.preventDefault();
    try {
      const verificationCode = code.join("");
      const response = await axios.post('http://localhost:8084/api/verify-code', { email, code: verificationCode });
      if (response.status === 200) {
        setMessage('Code verified successfully! Redirecting...');
        setTimeout(() => navigate('/reset-password'), 2000);
      }
    } catch (err) {
     
      setError(err.response?.data?.message || 'Invalid code. Please try again.');
    }
  };

  const handleResendCode = async () => {
    try {
      await axios.post('http://localhost:8084/api/resend-code');
      alert("Verification code has been resent to your email.");
    } catch (err) {
      alert("Failed to resend the code. Please try again.");
    }
  };

  return (
    <div className="verify-code-page">
      <div className="verify-code-container">
        <img src={logo} alt="Verification Icon" />
        <h2>Enter Verification Code</h2>
        <p>Enter the 6-digit code sent to your email to proceed.</p>
        <form onSubmit={handleVerify}>
          <div className="code-inputs">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`input-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleInputChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="code-input"
              />
            ))}
          </div>
          <button type="submit" className="confirm-button">Verify Code</button>
          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}
        </form>
        <button onClick={handleResendCode} className="resend-link">Resend Code</button>
      </div>
    </div>
  );
};

export default VerifyCode;
