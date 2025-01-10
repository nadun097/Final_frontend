// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./AddUser.css";
// import { FaChevronDown } from "react-icons/fa";

// const AddUser = () => {
//   const [userData, setUserData] = useState({
//     id: "",
//     name: "",
//     password: "",
//     role: "",
//     email: "",
//     address: "",
//     contact: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [popup, setPopup] = useState({ show: false, message: "", type: "" });

//   // Fetch the next UserID on component load
//   useEffect(() => {
//     const fetchNextUserId = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/api/users/nextUserId");
//         setUserData((prevData) => ({ ...prevData, id: response.data }));
//       } catch (error) {
//         console.error("Error fetching next UserID:", error);
//         alert("Could not fetch next UserID!");
//       }
//     };

//     fetchNextUserId();
//   }, []);




//   const validateField = (name, value) => {
//     let error = "";

//     if (name === "password" && value.length < 8) {
//       error = "Password must be at least 8 characters";
//     }

//     if (
//       name === "contact" &&
//       !/^\+?[0-9]{10,15}$/.test(value)
//     ) {
//       error = "Contact must be a valid phone number (10-15 digits)";
//     }

//     if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
//       error = "Email must be a valid email address";
//     }

//     if (name === "name" && value.trim() === "") {
//       error = "Name is required";
//     }

//     if (name === "role" && value === "") {
//       error = "Role is required";
//     }

//     if (name === "address" && value.trim() === "") {
//       error = "Address is required";
//     }

//     return error;
//   };


//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     const error = validateField(name, value);
//     setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));

//     setUserData({ ...userData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const { id, ...dataToSubmit } = userData; // Exclude UserID from payload
//       const response = await axios.post("http://localhost:8080/api/users/user", dataToSubmit);
//       const savedUser = response.data;

//       showPopup("User added successfully!");

//       // Update the form with returned user details
//       setUserData({
//         id: savedUser.id,
//         name: savedUser.name,
//         password: savedUser.password,
//         role: savedUser.role,
//         email: savedUser.email,
//         address: savedUser.address,
//         contact: savedUser.contact,
//       });
//     } catch (error) {
//       console.error("Error adding user:", error);
//       showPopup("There was an error adding the user!", "error");
//     }
//   };


//   const handleClear = () => {
//     setUserData({
//       id: userData.id, // Preserve the auto-generated UserID
//       name: "",
//       password: "",
//       role: "",
//       email: "",
//       address: "",
//       contact: "",
//     });

//     setErrors({});
//   };

//   const showPopup = (message, type) => {
//     setPopup({ show: true, message, type });
//   };

//   const closePopup = () => {
//     setPopup({ show: false, message: "", type: "" });
//   };

//   // const handleCancel = () => {
//   //   closePopup(); // Close the popup without clearing the form
//   // };

//   const isFormValid = () => {
//     return (
//       !Object.values(errors).some((error) => error) &&
//       Object.values(userData).every((value) => value.trim() !== "")
//     );
//   };
  

//   return (
//     <div className="form-wrapper">
//       <div className="form-container">
//         <h2>User Registration</h2>
//         <form onSubmit={handleSubmit} className="user-form">
//           <div className="form-group">
//             <input
//               type="text"
//               name="id"
//               value={userData.id || ""}
//               readOnly
//               placeholder="User ID"
//             />
//           </div>
//           <div className="form-group">
//             <input
//               type="text"
//               name="name"
//               value={userData.name}
//               onChange={handleChange}
//               placeholder="Name"
//               required
//             />

//             {errors.name && <small className="error">{errors.name}</small>}
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
//            {errors.email && <small className="error">{errors.email}</small>}

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

//           {errors.password && <small className="error">{errors.password}</small>}
//           </div>
//           <div className="form-group">
//             <select
//               name="role"
//               value={userData.role}
//               onChange={handleChange}
//               required
//             >
//               <option value="" disabled>Select Role</option>
//               <option value="AMC COORDINATOR">AMC COORDINATOR</option>
//               <option value="ACCOUNTANT">ACCOUNTANT</option>
//               <option value="ADMIN">ADMIN</option>
//               <option value="CLIENT">CLIENT</option>
//             </select>
//             <FaChevronDown className="dropdown-icon" />
//             {errors.role && <small className="error">{errors.role}</small>}
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

//           {errors.address && <small className="error">{errors.address}</small>}
//           </div>
//           <div className="form-group">
//             <input
//               type="tel"
//               name="contact"
//               value={userData.contact}
//               onChange={handleChange}
//               placeholder="Contact"
//               required
//             />
//             {errors.contact && <small className="error">{errors.contact}</small>}
//           </div>
//           <button type="submit" className="submit-btn" disabled={!isFormValid()}>
//             Add User
//           </button>
//           <button type="button" className="clear-btn" onClick={handleClear}>
//               Clear
//             </button>

//         </form>
//       </div>
      
//       {popup.show && (
//         <div className={`popup-message ${popup.type}`}>
//           <p>{popup.message}</p>
//           <button onClick={closePopup} className="popup-button">
//             OK
//           </button>
         
//         </div>
//       )}

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

  const [errors, setErrors] = useState({});
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });

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

  const validateField = (name, value) => {
    let error = "";

    if (name === "password" && value.length < 8) {
      error = "Password must be at least 8 characters";
    }

    if (
      name === "contact" &&
      !/^\+?[0-9]{10,15}$/.test(value)
    ) {
      error = "Contact must be a valid phone number (10-15 digits)";
    }

    if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      error = "Email must be a valid email address";
    }

    if (name === "name" && value.trim() === "") {
      error = "Name is required";
    }

    if (name === "role" && value === "") {
      error = "Role is required";
    }

    if (name === "address" && value.trim() === "") {
      error = "Address is required";
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate field
    const error = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));

    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { id, ...dataToSubmit } = userData;
      const response = await axios.post("http://localhost:8080/api/users/user", dataToSubmit);
      const savedUser = response.data;

      showPopup("User added successfully!");

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
      id: userData.id,
      name: "",
      password: "",
      role: "",
      email: "",
      address: "",
      contact: "",
    });
    setErrors({});
  };

  const showPopup = (message, type) => {
    setPopup({ show: true, message, type });
  };

  const closePopup = () => {
    setPopup({ show: false, message: "", type: "" });
  };

  const isFormValid = () => {
    return (
      !Object.values(errors).some((error) => error) &&
      Object.values(userData).every((value) =>
        typeof value === "string" ? value.trim() !== "" : value !== null && value !== undefined
      )
    );
  };
  


  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h2>User Registration</h2>
        <form onSubmit={handleSubmit} className="user-form">
          <div className="form-group">
            <input type="text" name="id" value={userData.id || ""} readOnly placeholder="User ID" />
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
            {errors.name && <small className="error">{errors.name}</small>}
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
            {errors.email && <small className="error">{errors.email}</small>}
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
            {errors.password && <small className="error">{errors.password}</small>}
          </div>
          <div className="form-group">
            <select
              name="role"
              value={userData.role}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="AMC COORDINATOR">AMC COORDINATOR</option>
              <option value="ACCOUNTANT">ACCOUNTANT</option>
              <option value="ADMIN">ADMIN</option>
              <option value="CLIENT">CLIENT</option>
            </select>
            <FaChevronDown className="dropdown-icon" />
            {errors.role && <small className="error">{errors.role}</small>}
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
            {errors.address && <small className="error">{errors.address}</small>}
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
            {errors.contact && <small className="error">{errors.contact}</small>}
          </div>
          <button type="submit" className="submit-btn" disabled={!isFormValid()}>
            Add User
          </button>
          <button type="button" className="clear-btn" onClick={handleClear}>
            Clear
          </button>
        </form>
      </div>
      {popup.show && (
        <div className={`popup-message ${popup.type}`}>
          <p>{popup.message}</p>
          <button onClick={closePopup} className="popup-button">
            OK
          </button>
        </div>
      )}
    </div>
  );
};

export default AddUser;

