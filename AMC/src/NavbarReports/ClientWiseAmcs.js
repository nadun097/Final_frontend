import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";
import "./ClientWiseAmcs.css";

export default function ClientWiseAmcReport() {
  const [amcData, setAmcData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/addAmcs/api/client-wise-amc-report")
      .then((response) => {
        setAmcData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching AMC data", error);
      });
  }, []);

  const generateReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Client Wise AMC Report", 14, 20);

    doc.setFontSize(17); // Increased font size
  doc.setTextColor(156, 94, 210); // RGB color for purple
  const pageWidth = doc.internal.pageSize.getWidth(); // Get the width of the page
  doc.text("NexaSoft", pageWidth - 30, 15, { align: "right" }); // Position at the top-right corner

  // Reset text color for the table
  doc.setTextColor(0, 0, 0); // Black text for table content
    autoTable(doc, {
      startY: 30,
      head: [["Client Name", "Company Name", "Company Email", "Company Phone", "Company Address", "Contract Name"]],
      body: amcData.map((amc) => [
        amc.clientName,
        amc.companyName,
        amc.companyEmail,
        amc.companyPhone,
        amc.companyAddress,
        amc.contractName,
      ]),
      headStyles: {
        fillColor: [156, 94, 210], // RGB color for the header background
        textColor: [255, 255, 255], // White text
        fontStyle: "bold",
      },
    });

    doc.save("client-wise-amc-report.pdf");
  };

  return (
    <div className="amc-report-container">
      <h4 className="report-title">Client Wise AMC Report</h4>
      <table className="amc-table">
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Company Name</th>
            <th>Company Email</th>
            <th>Company Phone</th>
            <th>Company Address</th>
            <th>Contract Name</th>
          </tr>
        </thead>
        <tbody>
          {amcData.map((amc, index) => (
            <tr key={index}>
              <td>{amc.clientName}</td>
              <td>{amc.companyName}</td>
              <td>{amc.companyEmail}</td>
              <td>{amc.companyPhone}</td>
              <td>{amc.companyAddress}</td>
              <td>{amc.contractName}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="download-button" onClick={generateReport}>
        Download Report
      </button>
    </div>
  );
}