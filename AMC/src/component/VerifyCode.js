import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./VerifyCode.css";
import logo from "../assets/verify.png"; // Ensure the path to your logo is correct

const VerifyCode = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]); // Array for 6-digit code
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (value, index) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move focus to the next input if a value is entered
    if (value && index < code.length - 1) {
      document.getElementById(`input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace to move focus to previous input
    if (e.key === "Backspace" && !code[index] && index > 0) {
      document.getElementById(`input-${index - 1}`).focus();
    }
  };

  const handleVerify = async (event) => {
    event.preventDefault();
    const verificationCode = code.join(""); // Join the array to get the full code
    try {
      const response = await axios.post('http://localhost:8080/api/verify-code', { code: verificationCode });
      if (response.status === 200) {
        setMessage('Code verified successfully! Redirecting...');
        setError('');

        // Redirect to the next page after verification
        setTimeout(() => {
          navigate('/reset-password'); // Adjust this route as needed
        }, 2000); // Redirect after 2 seconds
      }
    } catch (err) {
      setError('Invalid code. Please try again.');
      setMessage('');
    }
  };

  const handleResendCode = () => {
    // Logic to resend the verification code
    alert("Verification code has been resent to your email."); // Placeholder alert
    // You can implement the actual resend logic here, e.g., calling an API
  };

  return (
    <div className="verify-code-page">
      <div className="verify-code-container">
        <div className="icon">
          <img src={logo} alt="Logo Icon" />
        </div>
        <h2 className="verify-code-heading">Enter Verification Code</h2>
        <p className="verify-code-description">
          Enter the 6-digit code sent to your email to proceed.
        </p>
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
          <button type="submit" className="confirm-button">
            Verify Code
          </button>
          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}
        </form>
        <button onClick={handleResendCode} className="resend-link">
          Resend Code
        </button>
      </div>
    </div>
  );
};

export default VerifyCode;