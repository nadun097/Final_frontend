// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import "./ResetPassword.css";

// const ResetPassword = () => {
//     const location = useLocation();
//     const [email] = useState(location.state?.email || "");
//     const [name, setName] = useState("");
//     const [role, setRole] = useState("");
//     const [newPassword, setNewPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const [message, setMessage] = useState("");

//     useEffect(() => {
//         if (email) handleFetchUserDetails();
//     }, [email]);

//     const handleFetchUserDetails = async () => {
//         try {
//             const response = await axios.get(`http://localhost:8080/api/users/details/${encodeURIComponent(email)}`);
//             setName(response.data.name);
//             setRole(response.data.role);
//             setMessage(".");
//         } catch (error) {
//             const errorMsg = error.response?.data?.message || "User not found. Please check the email.";
//             setMessage(errorMsg);
//             setName("");
//             setRole("");
//         }
//     };

//     const handleResetPassword = async () => {
//         if (newPassword.length < 8) {
//             setMessage("Password must be at least 8 characters long.");
//             return;
//         }
//         if (newPassword !== confirmPassword) {
//             setMessage("Passwords do not match. Please try again.");
//             return;
//         }
    
//         try {
//             const response = await axios.post("http://localhost:8080/api/users/reset-password", { email, newPassword });
//             if (response.status === 200) {
//                 setMessage("Password reset successfully!");
//                 setNewPassword("");
//                 setConfirmPassword("");
//             }
//         } catch (error) {
//             const errorMsg = error.response?.data?.message || "Failed to reset password. Please try again.";
//             setMessage(errorMsg);
//         }
//     };
    

//     return (
//         <div className="reset-password-container">
//             <h2>Reset Password</h2>
//             <p>Email: <b>{email}</b></p>
//             <p>Name: {name}</p>
//             <p>Role: {role}</p>
//             <div className="input-container">
//                 <label>New Password:</label>
//                 <input
//                     type="password"
//                     value={newPassword}
//                     onChange={(e) => setNewPassword(e.target.value)}
//                     placeholder="Enter new password"
//                 />
//             </div>
//             <div className="input-container">
//                 <label>Re-enter New Password:</label>
//                 <input
//                     type="password"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     placeholder="Re-enter new password"
//                 />
//             </div >
//             {message && <p className="message">{message}</p>}
//             <button className="reset-password-button" onClick={handleResetPassword}>Reset Password</button>
//         </div>
//     );
// };

// export default ResetPassword;
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import "./ResetPassword.css";

const ResetPassword = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Initialize useNavigate
    const [email] = useState(location.state?.email || "");
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (email) handleFetchUserDetails();
    }, [email]);

    const handleFetchUserDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/users/details/${encodeURIComponent(email)}`);
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
        if (newPassword.length < 8) {
            setMessage("Password must be at least 8 characters long.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match. Please try again.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/api/users/reset-password", { email, newPassword });
            if (response.status === 200) {
                // Show a popup and redirect to the login page
                alert("Password reset successfully! You will be redirected to the login page.");
                navigate("/login"); // Redirect to the login page
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Failed to reset password. Please try again.";
            setMessage(errorMsg);
        }
    };

    return (
        <div className="reset-password-container">
            <h2>Reset Password</h2>
            <p>Email: <b>{email}</b></p>
            <p>Name: {name}</p>
            <p>Role: {role}</p>
            <div className="input-container">
                <label>New Password:</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                />
            </div>
            <div className="input-container">
                <label>Re-enter New Password:</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                />
            </div>
            {message && <p className="message">{message}</p>}
            <button className="reset-password-button" onClick={handleResetPassword}>Reset Password</button>
        </div>
    );
};

export default ResetPassword;
