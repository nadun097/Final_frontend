
import React, { useState } from "react";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import './FullAmc.css';

export default function FullAmcReport() {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [reportData, setReportData] = useState("");
    const [error, setError] = useState("");

    const handleGenerateReport = async () => {
        if (!startDate || !endDate) {
            setError("Please select a valid date range.");
            return;
        }
        setError(""); // Clear previous errors

        try {
            const response = await fetch(`http://localhost:8080/generate-amc-report?startDate=${startDate}&endDate=${endDate}`);
            
            if (response.ok) {
                const data = await response.json();
                setReportData(data);
                
            } else {
                setError("Error fetching report data. Please try again later.");
            }
        } catch (err) {
            console.error("Error fetching report data:", err);
            setError("Error fetching report data. Please check your network connection.");
        }
    };

    const handleDownloadPDF = () => {
        if (!reportData || !reportData.fullAmcReportDTO) {
            alert("No data available to download.");
            return;
        }

        const doc = new jsPDF();

        // Add title and metadata
        doc.setTextColor(204, 153, 255);
        const comName = "NexaSoft";
        const pageWidth = doc.internal.pageSize.width;
        doc.text(comName, pageWidth - 14 - doc.getTextWidth(comName), 10);

        doc.setTextColor(0, 0, 0);
        doc.text("Full AMC Report", 14, 10);
        doc.text(`Date Range: ${startDate} to ${endDate}`, 14, 20);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

        // Table
        const tableColumnHeaders = [
            "Contract Name",
            "Category",
            "Description",
            "Start Date",
            "End Date",
            "Cost",
            "Company Name",
            "Company Email"
        ];
        const tableRows = reportData.fullAmcReportDTO.map(row => [
            row.contractName,
            row.category,
            row.description,
            row.startDate,
            row.endDate,
            `Rs${row.cost.toFixed(2)}`,
            row.companyName,
            row.companyEmail
        ]);


        doc.autoTable({
            head: [tableColumnHeaders], // Header row
            body: tableRows,            // Table data
            startY: 40,                 // Starting Y position
            theme: 'grid',              // Table theme
            headStyles: {
                fillColor: [204, 153, 255], // Header background color
                textColor: [255, 255, 255]  // Header text color
            },
            columnStyles: {
                0: { cellWidth: 40 },   // Contract Name
                1: { cellWidth: 30 },   // Category
                2: { cellWidth: 50 },   // Description
                3: { cellWidth: 30 },   // Start Date
                4: { cellWidth: 30 },   // End Date
                5: { cellWidth: 25 },   // Cost
                6: { cellWidth: 40 },   // Company Name
                7: { cellWidth: 50 },   // Company Email
            }
        });
        

        // Summary
        const finalY = doc.lastAutoTable.finalY + 10;
        doc.text("Summary:", 14, finalY);
        doc.text(`Total Contracts: ${reportData.totalContracts}`, 14, finalY + 10);
        doc.text(`Total Cost: Rs${reportData.totalCost.toFixed(2)}`, 14, finalY + 20);

        doc.save("Full_AMC_Report.pdf");
        
    };
    console.log("22222");
        console.log(reportData);

    return (
        <div className="report-container1">
            <h4 className="report-title1">Full AMC Report</h4>
            <div className="report-filters1">
                <label>
                    Start Date:
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="report-input1"
                    />
                </label>
                <label>
                    End Date:
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="report-input1"
                    />
                </label>
                <button onClick={handleGenerateReport} className="report-button1">Generate Report</button>
            </div>

            {error && <p className="error-message1">{error}</p>}
            {(reportData && reportData.fullAmcReportDTO && reportData.fullAmcReportDTO.length > 0) ? (
                <div className="report-content1">
                    <table className="report-table1">
                        <thead>
                            <tr>
                                <th>Contract Name</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Cost</th>
                                <th>Company Name</th>
                                <th>Company Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportData.fullAmcReportDTO.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.contractName}</td>
                                    <td>{row.category}</td>
                                    <td>{row.description}</td>
                                    <td>{row.startDate}</td>
                                    <td>{row.endDate}</td>
                                    <td>Rs{row.cost.toFixed(2)}</td>
                                    <td>{row.companyName}</td>
                                    <td>{row.companyEmail}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="report-summary-section1">
                        <h5>Summary:</h5>
                        <ul>
                            <li>Total Contracts: {reportData.totalContracts}</li>
                            <li>Total Cost: Rs{reportData.totalCost.toFixed(2)}</li>
                        </ul>
                    </div>
                    <button onClick={handleDownloadPDF} className="report-button1">Download PDF</button>
                </div>
            ) : (
                !error && <p>No data available for the selected date range.</p>
            )}
        </div>
    );
}