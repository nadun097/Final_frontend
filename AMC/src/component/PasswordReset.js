// ResetPassword.js
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./ResetPassword.css";

const ResetPassword = () => {
    const location = useLocation();
    const [email] = useState(location.state?.email || "");
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (email) handleFetchUserDetails();
    }, [email]);

    const handleFetchUserDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/users/details/${email}`);
            setName(response.data.name);
            setRole(response.data.role);
            setMessage("");
        } catch (error) {
            const errorMsg = error.response?.data?.message || "User not found. Please check the email.";
            setMessage(errorMsg);
            setName("");
            setRole("");
        }
    };

    const handleResetPassword = async () => {
        try {
            const response = await axios.post("http://localhost:8080/api/reset-password-auto", { email });
            if (response.status === 200) {
                setMessage(`Password reset successfully! Your new password: ${response.data.password}`);
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Failed to reset password. Please try again.";
            setMessage(errorMsg);
        }
    };

    return (
        <div className="reset-password-container">
            <h2>Reset Password</h2>
            <p>Email: {email}</p>
            <p>Name: {name}</p>
            <p>Role: {role}</p>
            {message && <p>{message}</p>}
            <button onClick={handleResetPassword}>Reset Password</button>
        </div>
    );
};

export default ResetPassword;
