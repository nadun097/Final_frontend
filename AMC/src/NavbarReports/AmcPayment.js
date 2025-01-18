import React, { useState } from "react";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import './AmcPayment.css';


export default function CostReport() {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [reportData, setReportData] = useState(null);

    const handleGenerateReport = async () => {
        // Fetch the report data from the Spring Boot backend
        const response = await fetch(`http://localhost:8080/generate-report?startDate=${startDate}&endDate=${endDate}`);
        
        // Check if the response is successful
        if (response.ok) {
            const data = await response.json();
            setReportData(data);
        } else {
            console.error("Error fetching report data");
        }
    };


    const handleDownloadPDF = () => {
        const doc = new jsPDF();

         doc.setTextColor(204, 153, 255);
         const companyName = "NexaSoft";
         const pageWidth = doc.internal.pageSize.width; // Get the width of the page
         doc.text(companyName, pageWidth - 14 - doc.getTextWidth(companyName), 10);

         doc.setTextColor(0, 0, 0); // Black color
        doc.text("Cost Analysis Report", 14, 10);
        doc.text(`Date Range: ${startDate} to ${endDate}`, 14, 20);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

        

        if (reportData) {
            const tableColumnHeaders = ["Contract Name", "Category", "Cost"];
            const tableRows = reportData.rows.map(row => [
                row.contractName,
                row.category,
                `$${row.cost.toFixed(2)}`
            ]);

            // Add a table
            doc.autoTable({
                head: [tableColumnHeaders],
                body: tableRows,
                startY: 40,
                theme: 'grid',
                headStyles: {
                    fillColor: [204, 153, 255], // Light purple header background
                    textColor: [255, 255, 255] // White text color
                },
            });

            // Add summary
            doc.text("Summary:", 14, doc.lastAutoTable.finalY + 10);
            doc.text(`Total Cost: $${reportData.totalCost.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 20);
            doc.text(`Average Cost: $${reportData.averageCost.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 30);
            doc.text(`Highest-Cost Contract: ${reportData.highestCostContract}`, 14, doc.lastAutoTable.finalY + 40);
        }

        doc.save("Cost_Analysis_Report.pdf");
    };

    return (
        <div className="report-container" >
            <h4 className="report-title">Cost Analysis Report</h4>
            <div className="report-filters">
                <label>
                    Start Date: 
                    <input 
                        type="date" 
                        value={startDate} 
                        onChange={(e) => setStartDate(e.target.value)} 
                        className="report-input"
                    />
                </label>
                <label>
                    End Date: 
                    <input 
                        type="date" 
                        value={endDate} 
                        onChange={(e) => setEndDate(e.target.value)} 
                        className="report-input"
                    />
                </label>
                <button onClick={handleGenerateReport} className="report-button">Generate Report</button>
            </div>

            {reportData && (
                <div className="report-content">
                    <pre className="report-summary">
                        <code>
                            Cost Analysis Report for AMCs
                            Date Range: {startDate} to {endDate}
                            Generated on: {new Date().toLocaleDateString()}
                        </code>
                    </pre>
                    <table className="report-table">
                        <thead>
                            <tr>
                                <th>Contract Name</th>
                                <th>Category</th>
                                <th>Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportData.rows.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.contractName}</td>
                                    <td>{row.category}</td>
                                    <td>Rs{row.cost.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="report-summary-section">
                        <h5>Summary:</h5>
                        <ul>
                            <li>Total Cost: Rs{reportData.totalCost.toFixed(2)}</li>
                            <li>Average Cost: Rs{reportData.averageCost.toFixed(2)}</li>
                            <li>Highest-Cost Contract: {reportData.highestCostContract}</li>
                        </ul>
                    </div>

                    <button onClick={handleDownloadPDF} className="report-button">Download PDF</button>

                </div>
            )}
        </div>
    );
}
