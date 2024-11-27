import React, { useState } from "react";
import "./ClientForm.css";

const AddClient = () => {
  // State to manage form data
  const [clientData, setClientData] = useState({
    user_type: "",
    amcNum: "",
    email: "",
    phone: "",
    first_name: "",
    last_name: "",
    password: "",
  });

  // State to handle success/error messages
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setClientData({
      ...clientData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8083/api/user/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_contact: clientData.phone,
          user_email: clientData.email,
          user_first_name: clientData.first_name,
          user_id: clientData.userid,
          user_last_name: clientData.last_name,
          user_password: clientData.password,
          user_type: clientData.user_type,
        }),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`Client added successfully: ${data.message || "Success"}`);
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message || "Failed to add client"}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h2>Client Registration</h2>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit} className="client-form">
          <div className="form-group">
            <input
              type="text"
              name="user_type"
              value={clientData.user_type}
              onChange={handleChange}
              placeholder="User Type"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="userid"
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
              placeholder="User Email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="tel"
              name="phone"
              value={clientData.phone}
              onChange={handleChange}
              placeholder="User Contact"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="first_name"
              value={clientData.first_name}
              onChange={handleChange}
              placeholder="User First Name"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="last_name"
              value={clientData.last_name}
              onChange={handleChange}
              placeholder="User Last Name"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              value={clientData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
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
