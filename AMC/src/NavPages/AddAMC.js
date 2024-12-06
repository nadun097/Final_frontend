import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddAMC.css";

export default function AddAmc() {
  const [formData, setFormData] = useState({
    amcId: "",
    userId: "",
    contractName: "",
    category: "",
    description: "",
    startDate: "",
    endDate: "",
    cost: "",
    companyName: "",
    companyEmail: "",
    companyPhone: "",
    companyAddress: "",
  });

  const [errors, setErrors] = useState({}); // State to store validation errors
  const [isEditing, setIsEditing] = useState(false);
  const [clients, setClients] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [popup, setPopup] = useState({ message: "", isOpen: false, isError: false });

  useEffect(() => {
    const fetchNextAmcId = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/addAmcs/nextAmcId");
        setFormData((prevData) => ({ ...prevData, amcId: response.data }));
      } catch (error) {
        console.error("Error fetching next AMC ID:", error);
        alert("Could not fetch next AMC ID!");
      }
    };

    fetchNextAmcId();
  }, []);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/users/clients");
        setClients(response.data);
      } catch (error) {
        console.error("Error fetching clients:", error);
        alert("Could not fetch clients!");
      }
    };

    fetchClients();
  }, []);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/addAmcs/all");
        setTableData(response.data);
      } catch (error) {
        console.error("Error fetching table data:", error);
        alert("Could not fetch table data!");
      }
    };

    fetchTableData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const validationErrors = {};

    if (!formData.userId) validationErrors.userId = "Client is required.";
    if (!formData.contractName.trim()) validationErrors.contractName = "Contract Name is required.";
    if (!formData.category) validationErrors.category = "Category is required.";
    if (!formData.description.trim()) validationErrors.description = "Description is required.";
    if (!formData.startDate) validationErrors.startDate = "Start Date is required.";
    if (!formData.endDate) validationErrors.endDate = "End Date is required.";
    if (formData.startDate && formData.endDate && new Date(formData.startDate) > new Date(formData.endDate)) {
      validationErrors.startDate = "Start Date cannot be after End Date.";
    }
    if (!formData.cost || isNaN(formData.cost) || formData.cost <= 0) {
      validationErrors.cost = "Cost must be a positive number.";
    }
    if (!formData.companyName.trim()) validationErrors.companyName = "Company Name is required.";
    if (!formData.companyEmail.trim() || !/\S+@\S+\.\S+/.test(formData.companyEmail)) {
      validationErrors.companyEmail = "A valid Company Email is required.";
    }
    if (!formData.companyPhone.trim() || !/^\d{10,15}$/.test(formData.companyPhone)) {
      validationErrors.companyPhone = "Company Phone must contain 10-15 numbers.";
    }
    if (!formData.companyAddress.trim()) validationErrors.companyAddress = "Company Address is required.";

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; 


    try {
      const { amcId, ...dataToSubmit } = formData;
      const response = await axios.post("http://localhost:8080/api/addAmcs/addAmc", dataToSubmit);

      setPopup({ message: "AMC added successfully!", isOpen: true, isError: false });
      setFormData((prevData) => ({
        ...prevData,
        userId: "",
        contractName: "",
        category: "",
        description: "",
        startDate: "",
        endDate: "",
        cost: "",
        companyName: "",
        companyEmail: "",
        companyPhone: "",
        companyAddress: "",
      }));
    } catch (error) {
      console.error("Error adding AMC:", error);
      setPopup({ message: "There was an error adding the AMC.", isOpen: true, isError: true });
    }
  };

  const handleClear = () => {
    setFormData((prevData) => ({
      ...prevData,
      userId: "",
      contractName: "",
      category: "",
      description: "",
      startDate: "",
      endDate: "",
      cost: "",
      companyName: "",
      companyEmail: "",
      companyPhone: "",
      companyAddress: "",
    }));
  };

  const handleUpdate = (item) => {
    setFormData({
      amcId: item.amcId,
      userId: item.userId,
      contractName: item.contractName,
      category: item.category,
      description: item.description,
      startDate: item.startDate,
      endDate: item.endDate,
      cost: item.cost,
      companyName: item.companyName,
      companyEmail: item.companyEmail,
      companyPhone: item.companyPhone,
      companyAddress: item.companyAddress,
    });

    setIsEditing(true);
  };

  const handleSaveUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/api/addAmcs/update/${formData.amcId}`, formData);
      setPopup({ message: "AMC updated successfully!", isOpen: true, isError: false });
      setTableData((prevTableData) =>
        prevTableData.map((item) =>
          item.amcId === formData.amcId ? { ...item, ...formData } : item
        )
      );
      handleClear();
      setIsEditing(false); // Exit editing mode
    } catch (error) {
      console.error("Error updating AMC:", error);
      setPopup({ message: "There was an error updating the AMC.", isOpen: true, isError: true });
    }
  };
  

  const handleDelete = async (amcId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this AMC?");
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:8080/api/addAmcs/delete/${amcId}`);
        setTableData(tableData.filter(item => item.amcId !== amcId)); // Remove the deleted item from the state
      } catch (error) {
        console.error("Error deleting AMC:", error);
        alert("There was an error deleting the AMC.");
      }
    }
  };
  


  const closePopup = () => {
    setPopup({ message: "", isOpen: false, isError: false });
    window.location.reload();
  };

  return (
    <div className="add-amc-container">
      <h2>AMC Management</h2>
      <div className="forms-container">
      <form onSubmit={handleSubmit} className="amc-form">
        
        
          {[
            { label: "AMC Id", name: "amcId", type: "text", disabled: true },
            { label: "Client Id", name: "userId", type: "select", options: clients.map(client => ({ value: client.id, label: `${client.id} - ${client.name}` })) },
            { label: "Contract Name", name: "contractName", type: "text" },
            { label: "Category", name: "category", type: "select", options: ["Web Application", "Mobile Application", "Desktop Application", "Hybrid Application"].map(opt => ({ value: opt, label: opt })) },
            { label: "Description", name: "description", type: "textarea" },
            { label: "Cost", name: "cost", type: "number" },
            
          ].map((field, index) => (
            <div className="form-group" key={index}>
              <label>{field.label}</label>
              {field.type === "textarea" ? (
                <textarea name={field.name} value={formData[field.name]} onChange={handleChange}></textarea>
              ) : field.type === "select" ? (
                <select name={field.name} value={formData[field.name]} onChange={handleChange}>
                  <option value="" disabled>Select {field.label}</option>
                  {field.options.map((opt, i) => <option key={i} value={opt.value}>{opt.label}</option>)}
                </select>
              ) : (
                <input type={field.type} name={field.name} value={formData[field.name]} onChange={handleChange} disabled={field.disabled || false} />
              )}

            {errors[field.name] && <p className="error">{errors[field.name]}</p>}
            </div>
          ))} 
         </form> 
        
        <form className="amc-form">
          {[
          { label: "Start Date", name: "startDate", type: "date" },
          { label: "End Date", name: "endDate", type: "date" },
            { label: "Company Name", name: "companyName", type: "text" },
            { label: "Company Email", name: "companyEmail", type: "email" },
            { label: "Company Phone", name: "companyPhone", type: "tel" },
            { label: "Company Address", name: "companyAddress", type: "text" },
          ].map((field, index) => (
            <div className="form-group" key={index}>
              <label>{field.label}</label>

              {field.type === "textarea" ? (
              <textarea name={field.name} value={formData[field.name]} onChange={handleChange}></textarea>
            ) : field.type === "select" ? (
              <select name={field.name} value={formData[field.name]} onChange={handleChange}>
                <option value="">Select {field.label}</option>
                {field.options.map((opt, i) => (
                  <option key={i} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : ( 



              <input type={field.type} name={field.name} value={formData[field.name]} onChange={handleChange} />
            )}

            {errors[field.name] && <p className="error">{errors[field.name]}</p>}

            </div>
          ))}
         

        <div className="button-group">
          {isEditing ? (
            <button type="button" className="update-button" onClick={handleSaveUpdate}>
               Save Changes
               </button>
              ) : (
             <button type="submit" className="submit-button" onClick={handleSubmit}>
                 Submit
             </button>
           )}
           <button type="button" className="clear-button" onClick={handleClear}>
             Clear
            </button>
          </div>


          </form>
        </div>

      <div className="table-container">
        <h2>AMC Details</h2>
        <table className="amc-table">
          <thead>
            <tr>
              <th>AMC ID</th>
              <th>Client</th>
              <th>Contract Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Cost</th>
              <th>Company Name</th>
              <th>Company Email</th>
              <th>Company Phone</th>
              <th>Company Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr key={index}>
                <td>{item.amcId}</td>
                <td>{item.user.id}</td>
                <td>{item.contractName}</td>
                <td>{item.category}</td>
                <td>{item.description}</td>
                <td>{item.startDate}</td>
                <td>{item.endDate}</td>
                <td>{item.cost}</td>
                <td>{item.companyName}</td>
                <td>{item.companyEmail}</td>
                <td>{item.companyPhone}</td>
                <td>{item.companyAddress}</td>
                <td>
         
          <button className="tb-edit" onClick={() => handleUpdate(item)}>Edit</button>
          <button className="tb-delete" onClick={() => handleDelete(item.amcId)}>Delete</button>
        </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {popup.isOpen && (
        <div className="popup">
          <div className="popup-content">
            <p>{popup.message}</p>
            <button onClick={closePopup}>OK</button>
          </div>
        </div>
      )}
    </div>


  );
}
