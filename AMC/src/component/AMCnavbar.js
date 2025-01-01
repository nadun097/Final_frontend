import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './AMCnavbar.css'; // Ensure your CSS file exists

export default function AMCnavbar() {
  const [activeItem, setActiveItem] = useState("Full AMC");
  const navigate = useNavigate();

  const routes = {
    "Full AMC " : "/report/fullAmc", 
    
    "AMC PAYMENT ": "/report/amcPayment",
   
    "CLIENT WISE AMC ": "/report/clientWiseAmc",
   
    // "AMC CLIENT DETAILS ": "/report/amcClientDetails",
   
    // "RENEWAL AMCs ": "/report/renewalAmcs",
    
    // "SCHEDULED AMC ": "/report/scheduledAmc",
 
  };

  const handleClick = (item) => {
    setActiveItem(item);
    navigate(routes[item]);
  };

  return (
    <header className="header-nav1">
      <ul className="nav-page1">
        {Object.keys(routes).map((item) => (
          <li
            key={item}
            className={activeItem === item ? "active" : ""}
            onClick={() => handleClick(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </header>
  );
}
