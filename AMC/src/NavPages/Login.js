import React from 'react';
import './Login.css'; 
import { FaEnvelope, FaLock } from 'react-icons/fa'; 
import { Link, useNavigate } from 'react-router-dom'; 
import welcomeImage from '../assets/loginimage.png';

const Login = () => {
  const navigate = useNavigate(); 
  const handleSignIn = (event) => {
    event.preventDefault(); 
    navigate('/home'); 
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-left">
          <h2>Welcome Back!</h2>
          <img
            src={welcomeImage} 
            alt="Welcome"
            className="welcome-image"
          />
        </div>
        <div className="login-right">
          <div className="text-center">
            <h2>Hello!</h2>
            <p>Sign in to your account</p>
          </div>
          <form onSubmit={handleSignIn}>
            <div className="input-container">
              <FaEnvelope className="input-icon" />
              <input type="email" placeholder="Email" required />
            </div>
            <div className="input-container">
              <FaLock className="input-icon" />
              <input type="password" placeholder="Password" required />
            </div>
            <div className="forgot-password">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
            <button type="submit">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

