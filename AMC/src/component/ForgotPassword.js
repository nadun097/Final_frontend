import React, { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import "./ForgotPassword.css";

import logo from "../assets/forpass1.png"; // Ensure the path to your logo is correct


const ForgotPassword = () => {

  const [email, setEmail] = useState('');

  const [message, setMessage] = useState('');

  const [error, setError] = useState('');

  const navigate = useNavigate();


  const handleSubmit = async (event) => {

    event.preventDefault();

    try {

      const response = await axios.post('http://localhost:8080/api/forgot-password', { email });

      if (response.status === 200) {

        setMessage('A verification code has been sent to your email address.');

        setError('');

        // Optionally navigate to the verify code page after a successful request

        setTimeout(() => {

          navigate('/verify-code'); // Navigate to the verification code page

        }, 2000); // Delay for 2 seconds before navigating

      }

    } catch (err) {

      setError('Failed to send verification code. Please try again.');

      setMessage('');

    }

  };


  return (

    <div className="forgot-password-container">

      <div className="forgot-password-box">

        <img src={logo} alt="Logo" className="forgot-password-logo" />

        <h2>Forgot your password?</h2>

        <p>Enter your email address to reset your password.</p>

        <form className="forgot-password-form" onSubmit={handleSubmit}>

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

      </div>

    </div>

  );

};


export default ForgotPassword;