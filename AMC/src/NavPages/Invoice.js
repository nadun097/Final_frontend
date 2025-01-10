import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Invoice.css";

const InvoiceDetails = () => {
  const [invoiceDetails, setInvoiceDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from the backend
    fetch("http://localhost:8080/api/addAmcs/invoicePage") // Update with your backend endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setInvoiceDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleInvoiceClick = (amcId) => {
    // Redirect to the invoice page
    navigate(`/invoiceDetails/${amcId}`);
  };

 
  return (
    <div className="invoice-container1">
      <h1>Invoice Details</h1>
      <table className="invoice-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Contract Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {invoiceDetails.map((detail) => (
            <tr key={detail.amcId}>
              <td>{detail.amcId}</td>
              <td>{detail.contractName}</td>
              <td>
                <button
                  className="invoice-button1"
                  onClick={() => handleInvoiceClick(detail.amcId)}
                >
                  Invoice
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

};

export default InvoiceDetails;

