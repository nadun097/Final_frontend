// import React from "react";
// import "./NavigationBar.css";
// import { NavLink } from "react-router-dom";



// const NavigationBar = () => {
//   return (
//     <nav className="navbar">
     
//      <ul>
//         <li>
//           <NavLink
//             to="/view-amc"
//             className={({ isActive }) => (isActive ? "active-link" : "")}
//           >
//             View AMC
//           </NavLink>
//         </li>
//         <li>
//           <NavLink
//             to="/payments"
//             className={({ isActive }) => (isActive ? "active-link" : "")}
//           >
//             Payments
//           </NavLink>
//         </li>
//         <li>
//           <NavLink
//             to="/feedback"
//             className={({ isActive }) => (isActive ? "active-link" : "")}
//           >
//             Feedback
//           </NavLink>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default NavigationBar;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import imageSrc from "../assets/werfdew.jpg.png";
// import "./NavigationBar.css";

// export default function NavigationBar() {
//   const [activeItem, setActiveItem] = useState("View AMC ▼");
//   const navigate = useNavigate();

//   const handleClick = (item) => {
//     setActiveItem(item);
//   switch (item) {
//     case "View AMC ▼":
//       // navigate("/project-details/demo-contract");
//       break;
//     case "Payments ▼":
//       navigate("/payments");
//       break;
//     case "Feedback ▼":
//       navigate("/feedback");
//       break;
//     default:
//       break;
//     }
//   };

//   return (
//     <header className="nexa-header">
//       <img src={imageSrc} alt="nexasoft logo" className="logo" />
//       <nav>
//         <ul className="nav-bar">
//           {["View AMC ▼", "Payments ▼", "Feedback ▼"].map((item) => (
//             <li
//               key={item}
//               className={activeItem === item ? "active" : ""}
//               onClick={() => handleClick(item)}
//             >
//               {item}
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </header>
//   );
// }


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import imageSrc from "../assets/werfdew.jpg.png";
import "./NavigationBar.css";

export default function NavigationBar() {
  const [activeItem, setActiveItem] = useState("View AMC ▼");
  const navigate = useNavigate();

  const handleClick = (item) => {
    setActiveItem(item);
    switch (item) {
      case "View AMC ▼":
        navigate("/project-details:contractName");
        break;
      case "Payments ▼":
        navigate("/payments");
        break;
      case "Feedback ▼":
        navigate("/feedback");
        break;
      default:
        break;
    }
  };

  return (
    <header className="nexa-header">
      <img src={imageSrc} alt="nexasoft logo" className="logo" />
      <div className="nav-bar-container">
        <nav>
          <ul className="nav-bar">
            {["View AMC ▼", "Payments ▼", "Feedback ▼"].map((item) => (
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
      </div>
    </header>
  );
}
