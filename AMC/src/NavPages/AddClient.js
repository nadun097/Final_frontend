import React, { useState } from "react";
import "./ClientForm.css";

const AddClient = () => {
  const [clientData, setClientData] = useState({
    clientID: "",
    clName: "",
    amcNum: "",
    email: "",
    phone: "",

    projectDescription: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData({ ...clientData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      // Make an Axios POST request to send all user data
      const response = await axios.post(
        "http://localhost:8083/api/user/register", // Correct endpoint for registration
        userData // Send all form data as JSON in the request body
      );

      // Handle success
      if (response.status === 201) {
        console.log("User registered successfully:", response.data);
        alert("User registered successfully!");
      } else {
        console.error("Failed to register user:", response.status);
        alert("Failed to register user. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please check the console for details.");
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h2>Client Registration</h2>
        <form onSubmit={handleSubmit} className="client-form">
        <div className="form-group">
            <input
              type="text"
              name="clientID"
              value={clientData.clientID}
              onChange={handleChange}
              placeholder="Client ID"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="clName"
              value={clientData.clName}
              onChange={handleChange}
              placeholder="Client Name"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="amcNum"
              value={clientData.amcNum}
              onChange={handleChange}
              placeholder="AMC Number"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={clientData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="tel"
              name="phone"
              value={clientData.phone}
              onChange={handleChange}
              placeholder="Phone"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="address"
              value={clientData.address}
              onChange={handleChange}
              placeholder="Address"
              required
            />
          </div>
          <div className="form-group">
            <textarea
              name="projectDescription"
              value={clientData.projectDescription}
              onChange={handleChange}
              placeholder="Project Description"
              required
            ></textarea>
          </div>
          
          <button type="submit" className="submit-btn">
            Add Client
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddClient;
