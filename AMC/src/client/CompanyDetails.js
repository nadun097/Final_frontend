import React from "react";
import "./CompanyDetails.css";

const CompanyDetails = ({ company, onProjectClick }) => {
  return (
    <div className="company-container">
      <h2 className="company-name">{company.name}</h2>
      <p>
        <strong>Email:</strong> {company.email}
      </p>
      <p>
        <strong>Phone:</strong> {company.phone}
      </p>
      <p>
        <strong>Address:</strong> {company.address}
      </p>
      <h3>Projects</h3>
      <ul>
        {company.projects.map((project, index) => (
          <li
            key={index}
            className="project-item"
            onClick={() => onProjectClick(project)}
          >
            {project.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyDetails;
