import React, { useState } from "react";
import "./ClientForm.css";
import axios from "axios";

const UserRegistration = () => {
  const [userData, setUserData] = useState({
    user_contact: "",
    user_email: "",
    user_first_name: "",
    user_last_name: "",
    user_password: "",
    user_type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make an Axios POST request to send all user data
      const response = await axios.post(
        "http://localhost:8083/api/user/register", // Correct endpoint for registration
        userData 
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
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        <input
          type="text"
          name="user_contact"
          placeholder="Contact Number"
          value={userData.user_contact}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="user_email"
          placeholder="Email"
          value={userData.user_email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="user_first_name"
          placeholder="First Name"
          value={userData.user_first_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="user_last_name"
          placeholder="Last Name"
          value={userData.user_last_name}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="user_password"
          placeholder="Password"
          value={userData.user_password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="user_type"
          placeholder="User Type"
          value={userData.user_type}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default UserRegistration;
