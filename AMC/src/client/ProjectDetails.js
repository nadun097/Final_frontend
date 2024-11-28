import React, { useState } from "react";
import NavigationBar from "./NavigationBar";
import "./ProjectDetails.css";

const ProjectDetails = ({ project, onBack }) => {
  const [activeTab, setActiveTab] = useState("AMC");

  return (
    <div className="project-details">
      
      <NavigationBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <h2>{project.name}</h2>
      <p><strong>Description:</strong> {project.description}</p>
      <p><strong>Start Date:</strong> {project.startDate}</p>
      <p><strong>End Date:</strong> {project.endDate}</p>
      
      <div className="tab-content">
        {activeTab === "AMC" && <p>AMC details for {project.name}.</p>}
        {activeTab === "Payments" && <p>Payment details for {project.name}.</p>}
        {activeTab === "Feedback" && <p>Feedback for {project.name}.</p>}
      </div>
      <button className="back-button" onClick={onBack}>
        &larr; Back to Projects
      </button>
    </div>
  );
};

export default ProjectDetails;
