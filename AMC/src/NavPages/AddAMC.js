import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddAMC.css";

export default function AddAmc() {
  const [formData, setFormData] = useState({
    amcId: "",
    user_id: "",
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

  const [clients, setClients] = useState([]);
  const [amcDetails, setAmcDetails] = useState([]); // State to hold AMC details
  const [popup, setPopup] = useState({ message: "", isOpen: false, isError: false });

  // Fetch the next AMC ID on component load
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Clients first
        const responseClients = await axios.get("http://localhost:8080/api/users/clients");
        console.log("Clients Data:", responseClients.data);
        setClients(responseClients.data); // Set clients data in state

        // Fetch AMC details for each client
        const amcPromises = responseClients.data.map(client =>
          axios.get(`http://localhost:8080/api/addAmcs/clientDetails/${client.id}`)
        );

        const amcResponses = await Promise.all(amcPromises);
        const allAmcDetails = amcResponses.map(res => res.data);
        setAmcDetails(allAmcDetails);

        const responseAmcId = await axios.get("http://localhost:8080/api/addAmcs/nextAmcId");
        setFormData(prevData => ({ ...prevData, amcId: responseAmcId.data }));
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Could not fetch data!");
      }
    };

    fetchData(); // Call the function to fetch data
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { amcId, ...dataToSubmit } = formData; // Exclude AMC ID from payload
      const response = await axios.post("http://localhost:8080/api/addAmcs/addAmc", dataToSubmit);

      setPopup({ message: "AMC added successfully!", isOpen: true, isError: false });
      console.log("AMC Details Submitted:", response.data);

      // Reset the form, keeping the auto-generated amcId
      setPopup({ message: "AMC added successfully!", isOpen: true, isError: false });

      setFormData({
        amcId: formData.amcId,
        user_id: "",
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
    } catch (error) {
      console.error("Error adding AMC:", error);
      setPopup({ message: "There was an error adding the AMC.", isOpen: true, isError: true });
    }
  };

  const handleClear = () => {
    setFormData({
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
  };

  const closePopup = () => {
    setPopup({ message: "", isOpen: false, isError: false });
  };

  return (
    <div className="add-amc-container">
      {/* View Users Table */}
      <div className="user-details-table">
        <h2>AMC Details</h2>
        <table>
          <thead>
            <tr>
              <th>AMC ID</th>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Category</th>
              <th>Contract Name</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, index) => {
              const amcDetail = amcDetails[index] || {};
              return (
                <tr key={client.id}>
                  <td>{amcDetail.amcId || ""}</td>
                  <td>{client.id}</td>
                  <td>{client.name}</td>
                  <td>{client.email}</td>
                  <td>{client.contact}</td>
                  <td>{amcDetail.category || ""}</td>
                  <td>{amcDetail.contractName || ""}</td>
                  <td>{amcDetail.startDate || ""}</td>
                  <td>{amcDetail.endDate || ""}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <form onSubmit={handleSubmit} className="amc-form">
        {[
          { label: "AMC Id", name: "amcId", type: "text", disabled: true },
          { label: "Client Id", name: "user_id", type: "select", options: [{ value: "", label: "Select a client" }, ...clients.map(client => ({ value: client.id, label: `${client.id} - ${client.name}` }))] },
          { label: "Contract Name", name: "contractName", type: "text" },
          { label: "Category", name: "category", type: "select", options: [{ value: "WebApplication", label: "Web Application" }, { value: "MobileApplication", label: "Mobile Application" }, { value: "DesktopApplication", label: "Desktop Application" }, { value: "HybridApplication", label: "Hybrid Application" }] },
          { label: "Description", name: "description", type: "textarea", rows: 4 },
          { label: "Start Date", name: "startDate", type: "date" },
          { label: "End Date", name: "endDate", type: "date" },
          { label: "Cost", name: "cost", type: "number" },
          { label: "Company Name", name: "companyName", type: "text" },
          { label: "Company Email", name: "companyEmail", type: "email" },
          { label: "Company Phone", name: "companyPhone", type: "tel" },
          { label: "Company Address", name: "companyAddress", type: "text" },
        ].map((field, index) => (
          <div className="form-group" key={index}>
            <label>{field.label}</label>

            {field.type === "select" ? (
              <select name={field.name} value={formData[field.name]} onChange={handleChange} required>
                {field.options.map((option, i) => (
                  <option key={i} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : field.type === "textarea" ? (
              <textarea name={field.name} value={formData[field.name]} onChange={handleChange} rows={field.rows} required />
            ) : (
              <input type={field.type} name={field.name} value={formData[field.name]} onChange={handleChange} disabled={field.disabled} required />
            )}
          </div>
        ))}

        <button type="submit" className="submit-button">Submit</button>
        <button type="button" className="clear-button" onClick={handleClear}>Clear</button>
      </form>

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
