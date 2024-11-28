import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import "./Login.css";
import welcomeImage from "../assets/loginimage.png";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUserEmail = (event) => setEmail(event.target.value);
  const handlePassword = (event) => setPassword(event.target.value);

  const userLoginSubmit = async (event) => {
    event.preventDefault();

    const data = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        `http://localhost:8083/api/user/login?email=${email}&password=${password}`
      ); // Use axios.post

      // Assuming the API returns the user's email upon successful login
      const useremail = response.data.email;

      // Save user email in sessionStorage
      sessionStorage.setItem("useremail", useremail);

      alert("Login successful");

      // Navigate to the home page after successful login
      navigate("/home");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Invalid email or password");
      } else {
        alert("Network error");
        console.error(error);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-left">
          <h2>Welcome Back!</h2>
          <img src={welcomeImage} alt="Welcome" className="welcome-image" />
        </div>
        <div className="login-right">
          <div className="text-center">
            <h2>Hello!</h2>
            <p>Sign in to your account</p>
          </div>
          <form onSubmit={userLoginSubmit}>
            <div className="input-container">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={handleUserEmail}
              />
            </div>
            <div className="input-container">
              <FaLock className="input-icon" />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={handlePassword}
              />
            </div>
            <div className="forgot-password">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
            <button type="submit">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;

