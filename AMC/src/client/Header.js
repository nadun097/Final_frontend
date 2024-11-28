import React from "react";
import "./Header.css";
import imageSrc from "../assets/werfdew.jpg.png";

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={imageSrc} alt="nexasoft logo" className="logo" />   
      </div>
      <div className="right-section">
        <p className="icon notification-icon">🔔</p>
        <img src="https://via.placeholder.com/30" alt="profile" className="profile-icon" />
      </div>
    </header>
  );
};

export default Header;
