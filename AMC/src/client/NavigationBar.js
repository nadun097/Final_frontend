import React from "react";
import "./NavigationBar.css";

const NavigationBar = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="navigation-bar">
      <ul>
        <li
          className={activeTab === "AMC" ? "active" : ""}
          onClick={() => setActiveTab("AMC")}
        >
          View AMC
        </li>
        <li
          className={activeTab === "Payments" ? "active" : ""}
          onClick={() => setActiveTab("Payments")}
        >
          Payments
        </li>
        <li
          className={activeTab === "Feedback" ? "active" : ""}
          onClick={() => setActiveTab("Feedback")}
        >
          Feedback
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
