
import React, { useState } from "react";
import "./VerifyCode.css";
import logo from "../assets/verify.png"; 

const VerifyCode = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const handleInputChange = (value, index) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < code.length - 1) {
      document.getElementById(`input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      document.getElementById(`input-${index - 1}`).focus();
    }
  };

  const handleSubmit = () => {
    alert(`Code entered: ${code.join("")}`);
  };

  const handleResendCode = () => {
    alert("Resend Code clicked");
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
        <button onClick={handleSubmit} className="confirm-button">
          Verify Code
        </button>
        <button onClick={handleResendCode} className="resend-link">
          Resend Code
        </button>
      </div>
    </div>
  );
};

export default VerifyCode;
