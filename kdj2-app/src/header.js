// src/Header.js
import React from "react";
import "./App.css";

function Header() {
  return (
    <header className="header">
      {/* Logo Section */}
      <div className="logo">
        <h1>MyLogo</h1>
      </div>

      {/* Navigation Links */}
      <nav className="nav-links">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
      </nav>

      {/* Search/Profile Section */}
      <div className="right-section">
        <input type="text" placeholder="Search..." className="search-bar" />
      </div>
    </header>
  );
}

export default Header;
