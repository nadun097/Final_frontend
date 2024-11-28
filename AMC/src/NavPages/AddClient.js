import React, { useState } from "react";
import "./ClientForm.css";

const UserRegistration = () => {
  const [userData, setUserData] = useState({
     user_contact: 123456789,
    user_email: 'example@example.com',
    user_first_name: 'John',
    user_id: 1,
    user_last_name: 'Doe',
    user_password: 'password123',
    user_type: 'admin',
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
      const response = await fetch('http://localhost:3000/api/user/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: 'include', // Include cookies/credentials
      });

      if (response.ok) {
        const result = await response.json();
        console.log('User registered successfully:', result);
        alert('User registered successfully!');
      } else {
        console.error('Failed to register user:', response.status);
        alert('Failed to register user. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred. Please check the console for details.');
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