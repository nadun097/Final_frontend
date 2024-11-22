import React, { useState } from "react";
import "./AddAMC.css";

export default function AddAmc() {
  const [formData, setFormData] = useState({
    amcNumber: "",
    contractName: "",
    clientName: "",
    startDate: "",
    endDate: "",
    cost: "",
    description: "",
    category: "",
    attachments: [],
    workers: "",
    assets: "",
    photo: null,
    projectColours: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files });
  };

  const handlePhotoChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("AMC Details Submitted:", formData);
    alert("AMC added successfully!");
    setFormData({
      amcNumber: "",
      contractName: "",
      clientName: "",
      startDate: "",
      endDate: "",
      cost: "",
      description: "",
      category: "",
      attachments: [],
      workers: "",
      assets: "",
      photo: null,
      projectColours: "",
    });
  };

  return (
    <div className="add-amc-container">
      <h4>Add AMC</h4>
      <form onSubmit={handleSubmit} className="amc-form">
        {[
          { label: "AMC Number", name: "amcNumber", type: "text", placeholder: "Enter AMC Number" },
          { label: "Contract Name", name: "contractName", type: "text", placeholder: "Enter Contract Name" },
          { label: "Client Name", name: "clientName", type: "text", placeholder: "Enter Client Name" },
          { label: "Start Date", name: "startDate", type: "date" },
          { label: "End Date", name: "endDate", type: "date" },
          { label: "Cost", name: "cost", type: "number", placeholder: "Enter Cost" },
          { label: "Description", name: "description", type: "textarea", placeholder: "Enter Description", rows: 4 },
          { label: "Category", name: "category", type: "select", options: ["WebApplication", "MobileApplication", "DesktopApplication", "HybridApplication"] },
          { label: "Attachments", name: "attachments", type: "file", multiple: true },
          { label: "Workers", name: "workers", type: "text", placeholder: "Enter Workers" },
          { label: "Assets", name: "assets", type: "text", placeholder: "Enter Assets" },
          { label: "Project Photo", name: "photo", type: "file" },
          { label: "Project Colours", name: "projectColours", type: "text", placeholder: "Enter Project Colours" },
        ].map((field, index) =>
          field.type === "select" ? (
            <div className="form-group" key={index}>
              <label>{field.label}</label>
              <select
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select {field.label}
                </option>
                {field.options.map((option, i) => (
                  <option key={i} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ) : field.type === "textarea" ? (
            <div className="form-group1" key={index}>
              <label>{field.label}</label>
              <textarea
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                rows={field.rows}
                required
              ></textarea>
            </div>
          ) : (
            <div className="form-group1" key={index}>
              <label>{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={field.type === "file" ? handleFileChange : handleChange}
                placeholder={field.placeholder}
                required
                multiple={field.multiple}
              />
            </div>
          )
        )}
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}
