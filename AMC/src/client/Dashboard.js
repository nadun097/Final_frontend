
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import "./CompanyDetails.css";
import "./ClientDetails.css";
import "./ClientHeader.css";
import "./ProjectDetails.css";
import pic from '../assets/avatar.png';
import imageSrc from "../assets/werfdew.jpg.png";

const Dashboard = () => {
 
  const [data, setData] = useState(null);
  const email = localStorage.getItem('email');
  const navigate = useNavigate();
  

 
  useEffect(() => {
    const fetchDetails = async () => {
      if (!email) {
        console.error("No email found in localStorage");
        return;
      }
      
      try {
        const response = await fetch(`http://localhost:8080/api/users/client-company-details/${email}`);
        if(!response.ok)
        {
          console.error("HTTP ERROR:", response.status);
          throw new Error ('Network response was not ok');
        }
        const result = await response.json();
        console.log(result);

        setData({
          client: result.clientDetails,
          company: result.companyDetails,
        });

      } catch (error) {
        console.error("Error fetching client data:", error);
        setData({ error: "Unable to load data. Please check your connection." });
      }
    };

    fetchDetails();
  }, [email]);

 
  if (!data || !data.client || !data.company || data.company.length ===0) {
    return <div>Loading...</div>;
  }

  const uniqueCompanies = Array.from(
    data.company.reduce((map, company) => {
      const existing = map.get(company.companyName) || {
        companyDetails: company,
        contracts: [],
      };
      existing.contracts.push(company.companyContract);
      map.set(company.companyName, existing);
      return map;
    }, new Map()).values()
  );

  const handleContractClick = (contract) => {
    navigate(`/project-details/${contract}`);
  };

  return (
    <>
      <ClientHeader />
      <div className="dashboard1">
        <div className="left-panel">
          <ClientDetails client={data.client} />
        </div>
        <div className="right-panel">    
      
        {uniqueCompanies.map((entry, index) => (
            <CompanyDetails
              key={index}
              company={entry.companyDetails}
              contracts={entry.contracts}
              onContractClick={handleContractClick}
            />
          ))}


        </div>
      </div>
    </>
  );
};

const ClientHeader = () => (
  <header className="header">
    <div className="logo-container">
      <img src={imageSrc} alt="nexasoft logo" className="logo" />
    </div>
    <div className="right-section">
      <p className="icon notification-icon">🔔</p>
      <img
        src="https://via.placeholder.com/30"
        alt="profile"
        className="profile-icon"
      />
    </div>
  </header>
);

const CompanyDetails = ({ company,contracts,onContractClick}) => {
  return (
    <div className="company-container">
      <h2 className="company-name">{company.companyName}</h2>
      <div className="com-details">
        <p>
          <strong>Email:</strong> {company.companyEmail}
        </p>
        <p>
          <strong>Phone:</strong> {company.companyContact}
        </p>
        <p>
          <strong>Address:</strong> {company.companyAddress}
        </p>
        <p>
          <strong>Contracts:</strong>
        </p>
        <ul>
          {contracts.map((companyContract, index) => (
            <li
              key={index}
              className="contract-link"
                onClick={()=> onContractClick(companyContract)}>
              {companyContract}
            </li>
          ))}
        </ul>
       
      </div>
    </div>
  );
};

const ClientDetails = ({ client }) => {
  return (
    <div className="client-container">
      <img
        src={pic}
        alt="Client Avatar"
        className="client-avatar"
      />
    
      <p>
        <strong>ID:</strong> {client.id || "N/A"}
      </p>
      <p>
        <strong>Name:</strong> {client.name || "N/A"}
      </p>
      <p>
        <strong>Email:</strong> {client.email || "N/A"}
      </p>
      <p>
        <strong>Contact:</strong> {client.contact || "N/A"}
      </p>
    </div>
  );
};

export default Dashboard;