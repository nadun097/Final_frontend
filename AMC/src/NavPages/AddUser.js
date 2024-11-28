// import React, { useState } from "react";
// import "./AddUser.css";
// import { FaChevronDown } from "react-icons/fa";

// const AddUser = () => {
//   const [userData, setUserData] = useState({
//     UserID: "",
//     uName: "",
//     password: "",
//     role:"",
//     email: "",
//     address: "",
//     phone: "",
 
//   });

  
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserData({ ...userData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();


//     try {
//       const response = await fetch('http://localhost:8080/api/users', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           name: userData.uName,
//           email: userData.email,
//           password: userData.password,
//           role: userData.role,
//           address: userData.address,
//           contact: userData.phone,
//         }),
//       });

//       if (response.ok) {
//         const savedUser = await response.json(); // Get the user object with the generated id
//         setUserData({
//           userID: savedUser.id, // Set the auto-generated ID in the state
//           uName: savedUser.name,
//           password: savedUser.password,
//           role: savedUser.role,
//           email: savedUser.email,
//           address: savedUser.address,
//           phone: savedUser.contact,
//         });

//         alert("User added successfully!");
//       } else {
//         alert("Failed to add user");
//       }
//     } catch (error) {
//       console.error("Error adding user:", error);
//     }
      
//   };




//   return (
//     <div className="form-wrapper">
//       <div className="form-container">
//         <h2>User Registration</h2>
//         <form onSubmit={handleSubmit} className="user-form">
//         <div className="form-group">
//             <input
//               type="text"
//               name="userID"
//               value={userData.userID}
//               readOnly
//               placeholder="User ID"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <input
//               type="text"
//               name="uName"
//               value={userData.uName}
//               onChange={handleChange}
//               placeholder= "Name"
//               required
//             />
//           </div>
         
//           <div className="form-group">
//             <input
//               type="email"
//               name="email"
//               value={userData.email}
//               onChange={handleChange}
//               placeholder="Email"
//               required
//             />
            
//           </div>

//           <div className="form-group">
//             <input
//               type="password"
//               name="password"
//               value={userData.password}
//               onChange={handleChange}
//               placeholder="Password"
//               required
//             />
            
//           </div>
//           <div className="form-group">
//             <select
//               name="role"
//               value={userData.role}
//               onChange={handleChange}
//               required
//             >
//               <option value="" disabled>
//                 Select Role
//               </option>
//               <option value="AMC COORDINATOR">AMC COORDINATOR</option>
//               <option value="ACCOUNTANT">ACCOUNTANT</option>
//               <option value="ADMIN">ADMIN</option>
//               <option value="CLIENT">CLIENT</option>
//             </select>
//             <FaChevronDown className="dropdown-icon" />
//           </div>


//           <div className="form-group">
//             <input
//               type="text"
//               name="address"
//               value={userData.address}
//               onChange={handleChange}
//               placeholder="Address"
//               required
//             />
//           </div>

//           <div className="form-group">
//             <input
//               type="tel"
//               name="phone"
//               value={userData.phone}
//               onChange={handleChange}
//               placeholder="Contact"
//               required
//             />
//           </div>
          
//           <button type="submit" className="submit-btn">
//             Add User
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddUser;
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
      alert("User added successfully!");

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
      alert("There was an error adding the user!");
    }
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
        </form>
      </div>
    </div>
  );
};

export default AddUser;
