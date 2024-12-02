

import React, { useState } from 'react';
import './Login.css';
import { FaEnvelope, FaLock, FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import welcomeImage from '../assets/loginimage.png';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/login', {
        email,
        password,
      });
      if (response.status === 200) {
        const role = response.data.role; // Assuming role is returned from the backend
        if (role === 'CLIENT') {
          navigate('/ProjectDetail'); // Navigate to Client Dashboard
        } else if (['ADMIN', 'AMC COORDINATOR', 'ACCOUNTANT'].includes(role)) {
          navigate('/home'); // Navigate to shared dashboard
        }
      }
    } catch (err) {
      setShowErrorPopup(true);
    }
  };

  const closePopup = () => {
    setShowErrorPopup(false); // Close the error popup
  };

  const handleBackButtonClick = () => {
    navigate('/'); // Navigate to Landing Page
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-left">
          
           <a href="/" className="login-back-link">
          &larr; 
        </a>
          <h2>Welcome Back!</h2>
          <img src={welcomeImage} alt="Welcome" className="welcome-image" />
        </div>
        <div className="login-right">
          <div className="text-center">
            <h2>Hello!</h2>
            <p>Sign in to your account</p>
          </div>
          <form onSubmit={handleSignIn}>
            <div className="input-container">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <FaLock className="input-icon" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <div className="forgot-password">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
            <button type="submit">Sign In</button>
          </form>
          {showErrorPopup && (
            <div className="popup-overlay">
              <div className="popup-content">
                <p>Invalid email or password!</p>
                <button onClick={closePopup}>OK</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;