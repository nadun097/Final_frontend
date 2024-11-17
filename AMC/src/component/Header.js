import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import imageSrc from "../assets/werfdew.jpg.png";
import "./Header.css";

export default function Header() {
  const [activeItem, setActiveItem] = useState("HOME");
  const navigate = useNavigate();

  const handleClick = (item) => {
    setActiveItem(item);
  switch (item) {
    case "HOME ▼":
      navigate("/home");
      break;
    case "PROJECTS ▼":
      navigate("/project");
      break;
    case "INVOICE ▼":
      navigate("/invoice");
      break;
    case "REPORTS ▼":
      navigate("/report");
      break;
    case "ADD CLIENTS ▼":
      navigate("/addClients");
      break;
    case "ADD AMC ▼":
      navigate("/addAmc");
      break;
    default:
      break;
    }
  };

  return (
    <header className="header-nav">
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
        <i className="icon-notification-icon">🔔</i>
        <img src="https://via.placeholder.com/30" alt="profile" className="profile-icon" />
      </div>
    </header>
  );
}
