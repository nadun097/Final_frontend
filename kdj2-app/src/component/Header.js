import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import imageSrc from "../assets/werfdew.jpg.png";
import "./Header.css";

export default function Header() {
  const [activeItem, setActiveItem] = useState("HOME");
  const navigate = useNavigate(); // Initialize the navigate function

  const handleClick = (item) => {
    setActiveItem(item);
    if (item === "PROJECTS ▼") {
      navigate("/about"); // Navigate to the About page
    }
  };

  return (
    <header className="header">
      <img src={imageSrc} alt="nexasoft logo" className="logo" />
      <nav>
        <ul className="nav-page">
          {["HOME ▼", "PROJECTS ▼", "INVOICE ▼", "REPORTS ▼", "ADD CLIENTS ▼", "ADD AMC ▼"].map((item) => (
            <li
              key={item}
              className={activeItem === item ? "active" : ""}
              onClick={() => handleClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>
      <div className="right-section">
        <input type="text" placeholder="Search..." className="search-input" />
        <i className="icon notification-icon">🔔</i>
        <img src="https://via.placeholder.com/30" alt="profile" className="profile-icon" />
      </div>
    </header>
  );
}

