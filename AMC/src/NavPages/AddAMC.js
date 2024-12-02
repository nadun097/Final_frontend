
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddAMC.css";

export default function AddAmc() {
  const [formData, setFormData] = useState({
    amcId: "",
    user_id: "",
    contractName: "",
    category: "",
    description: "",
    startDate: "",
    endDate: "",
    cost: "",
    companyName: "",
    companyEmail: "",
    companyPhone: "",
    companyAddress: "",
  });

  const [clients, setClients] = useState([]);


  const [popup, setPopup] = useState({ message: "", isOpen: false, isError: false });

  // Fetch the next AMC ID on component load
  useEffect(() => {
    const fetchNextAmcId = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/addAmcs/nextAmcId");
        setFormData((prevData) => ({ ...prevData, amcId: response.data }));
      } catch (error) {
        console.error("Error fetching next AMC ID:", error);
        alert("Could not fetch next AMC ID!");
      }
    };

    fetchNextAmcId();
  }, []);


  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/users/clients"); // Adjust endpoint as needed
        setClients(response.data); // Assume response.data is an array of { userId, username }
      } catch (error) {
        console.error("Error fetching clients:", error);
        alert("Could not fetch clients!");
      }
    };
  
    fetchClients();
  }, []);
  


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { amcId, ...dataToSubmit } = formData; // Exclude AMC ID from payload
      const response = await axios.post("http://localhost:8080/api/addAmcs/addAmc", dataToSubmit);

      setPopup({ message: "AMC added successfully!", isOpen: true, isError: false });
      console.log("AMC Details Submitted:", response.data);

      // Reset the form, keeping the auto-generated amcId
      setFormData((prevData) => ({
        ...prevData,
        user_id: "",
        contractName: "",
        category: "",
        description: "",
        startDate: "",
        endDate: "",
        cost: "",
        companyName: "",
        companyEmail: "",
        companyPhone: "",
        companyAddress: "",
      }));
    } catch (error) {
      console.error("Error adding AMC:", error);
      setPopup({ message: "There was an error adding the AMC.", isOpen: true, isError: true });
    }
  };

  const handleClear = () => {
    setFormData((prevData) => ({
      ...prevData,
      user_id: "",
      contractName: "",
      category: "",
      description: "",
      startDate: "",
      endDate: "",
      cost: "",
      companyName: "",
      companyEmail: "",
      companyPhone: "",
      companyAddress: "",
    }));
  };

  const closePopup = () => {
    setPopup({ message: "", isOpen: false, isError: false });
  };


  return (
    <div className="add-amc-container">
      <form onSubmit={handleSubmit} className="amc-form">
        {[
          { label: "AMC Id", name: "amcId", type: "text", placeholder: "Enter AMC Id", disabled: true },
          { label: "Client Id", name: "user_id", type: "select", options: clients.map(client => ({ value: client.id, label: `${client.id} - ${client.name}` })) },

          //{ label: "Client Id", name: "userId", type: "text", placeholder: "Select Client Id" },
          { label: "Contract Name", name: "contractName", type: "text", placeholder: "Enter Contract Name" },
          { label: "Category", name: "category", type: "select", options: [

            { value: "WebApplication", label: "Web Application" },
            { value: "MobileApplication", label: "Mobile Application" },
            { value: "DesktopApplication", label: "Desktop Application" },
            { value: "HybridApplication", label: "Hybrid Application" }

         ] },
          { label: "Description", name: "description", type: "textarea", placeholder: "Enter Description", rows: 4 },
          { label: "Start Date", name: "startDate", type: "date" },
          { label: "End Date", name: "endDate", type: "date" },
          { label: "Cost", name: "cost", type: "number", placeholder: "Enter Cost" },
          { label: "Company Name", name: "companyName", type: "text", placeholder: "Enter Company Name" },
          { label: "Company Email", name: "companyEmail", type: "email", placeholder: "Enter Company Email" },
          { label: "Company Phone", name: "companyPhone", type: "tel", placeholder: "Enter Company Phone" },
          { label: "Company Address", name: "companyAddress", type: "text", placeholder: "Enter Company Address" },
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
                  <option key={i} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          ) : field.type === "textarea" ? (
            <div className="form-group" key={index}>
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
            <div className="form-group" key={index}>
              <label>{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                disabled={field.disabled || false}
                required
              />
            </div>
          )
        )}
        <button type="submit" className="submit-button">
          Submit
        </button>

        <button type="button" className="clear-button" onClick={handleClear}>
          Clear
        </button>

      </form>
      {popup.isOpen && (
        <div className="popup">
          <div className="popup-content">
            <p>{popup.message}</p>
            <button onClick={closePopup}>OK</button>
          </div>
        </div>
      )}

    </div>
  );
} 
