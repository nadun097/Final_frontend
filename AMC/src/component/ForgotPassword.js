// ForgotPasswordAndVerify.js
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

    const [email, setEmail] = useState(location.state?.email || "");
    const [code, setCode] = useState(Array(6).fill(""));
    const [step, setStep] = useState(location.pathname.includes("verify-code") ? "verify" : "forgot");

    const handleForgotPasswordSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await axios.post("http://localhost:8080/api/email/forgot-password", { email });
          if (response.status === 200) {
            window.alert(response.data); 
            setStep("verify");
          }
        } catch (err) {
          const errorMsg = err.response?.data || "Failed to process your request. Please try again.";
          window.alert(errorMsg); 
        }
      };
      

    const handleVerifySubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/verify-code", { email, code: code.join("") });
            if (response.status === 200) {
                window.alert("Code verified successfully! Redirecting...");
                navigate("/password-reset", { state: { email } });
            }
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Invalid code. Please try again.";
            window.alert(errorMsg);
        }
    };

    const handleCodeChange = (value, index) => {
        const updatedCode = [...code];
        updatedCode[index] = value.slice(0, 1);
        setCode(updatedCode);

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
                            <button className="forgot-password-button">
                                <span>Send Verification Code</span>
                            </button>
                        </form>
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
                            <button className="forgot-password-button">
                                <span>Verify Code</span>
                            </button>
                        </form>
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
