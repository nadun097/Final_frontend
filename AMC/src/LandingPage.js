import React from 'react';
import { useNavigate } from 'react-router-dom';  
import './LandingPage.css';
import background from './assets/back.jpg';
import cards from './assets/card-elements.png';
import logo from './assets/nexasoft-logo.png';

const LandingPage = () => {
  const navigate = useNavigate();  

  const handleSignIn = () => {
   
    navigate('/login');
  };

  return (
    <div className="landing-page">
      <div className="background-container">
        <img src={background} alt="Background" className="back" />
      </div>

      <div className="main-content">
        <div className="cards-container">
          <img src={cards} alt="Cards" className="cards-image" />
        </div>

        <div className="content">
          <img src={logo} alt="NexaSoft Logo" className="logo-image" />
          <h2 className="heading">
            Dedicated maintenance for contract clients. You're in trusted hands.
          </h2>
          <p className="signin-text">Sign in to your account</p>
          <button className="sign-in-button" onClick={handleSignIn}>
            Sign in
          </button>
        </div>
      </div>

      <footer>Copyright © 2024 NexaSoft. All Rights Reserved</footer>
    </div>
  );
};

export default LandingPage;
