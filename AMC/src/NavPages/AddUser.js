import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddUser.css";
import { FaChevronDown } from "react-icons/fa";

const AddUser = () => {
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    password: "",
    role: "",
    email: "",
    address: "",
    contact: "",
  });

  const [popup, setPopup] = useState({ show: false, message: "", type: "" });

  // Fetch the next UserID on component load
  useEffect(() => {
    const fetchNextUserId = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/users/nextUserId");
        setUserData((prevData) => ({ ...prevData, id: response.data }));
      } catch (error) {
        console.error("Error fetching next UserID:", error);
        alert("Could not fetch next UserID!");
      }
    };

    fetchNextUserId();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { id, ...dataToSubmit } = userData; // Exclude UserID from payload
      const response = await axios.post("http://localhost:8080/api/users/user", dataToSubmit);
      const savedUser = response.data;

      showPopup("User added successfully!");

      // Update the form with returned user details
      setUserData({
        id: savedUser.id,
        name: savedUser.name,
        password: savedUser.password,
        role: savedUser.role,
        email: savedUser.email,
        address: savedUser.address,
        contact: savedUser.contact,
      });
    } catch (error) {
      console.error("Error adding user:", error);
      showPopup("There was an error adding the user!", "error");
    }
  };


  const handleClear = () => {
    setUserData({
      id: userData.id, // Preserve the auto-generated UserID
      name: "",
      password: "",
      role: "",
      email: "",
      address: "",
      contact: "",
    });
  };

  const showPopup = (message, type) => {
    setPopup({ show: true, message, type });
  };

  const closePopup = () => {
    setPopup({ show: false, message: "", type: "" });
  };

  const handleCancel = () => {
    closePopup(); // Close the popup without clearing the form
  };
  

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h2>User Registration</h2>
        <form onSubmit={handleSubmit} className="user-form">
          <div className="form-group">
            <input
              type="text"
              name="id"
              value={userData.id || ""}
              readOnly
              placeholder="User ID"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              placeholder="Name"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>
          <div className="form-group">
            <select
              name="role"
              value={userData.role}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select Role</option>
              <option value="AMC COORDINATOR">AMC COORDINATOR</option>
              <option value="ACCOUNTANT">ACCOUNTANT</option>
              <option value="ADMIN">ADMIN</option>
              <option value="CLIENT">CLIENT</option>
            </select>
            <FaChevronDown className="dropdown-icon" />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="address"
              value={userData.address}
              onChange={handleChange}
              placeholder="Address"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="tel"
              name="contact"
              value={userData.contact}
              onChange={handleChange}
              placeholder="Contact"
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            Add User
          </button>
          <button type="button" className="clear-btn" onClick={handleClear}>
              Clear
            </button>

        </form>
      </div>
         {/* Popup Message */}
      {popup.show && (
        <div className={`popup-message ${popup.type}`}>
          <p>{popup.message}</p>
          <button onClick={closePopup} className="popup-button">
            OK
          </button>
          <button onClick={handleCancel} className="popup-button cancel-btn">
        Cancel
      </button>
        </div>
      )}

    </div>
  );
};

export default AddUser;
