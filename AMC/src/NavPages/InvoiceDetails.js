import React,{useState,useEffect} from 'react';
import { useParams } from "react-router-dom";
import './InvoiceDetails.css';
import { Link } from "react-router-dom";

function Invoice() {
  const { amcId } = useParams(); 
 

  const [items, setItems] = useState([
    { description: "Software Maintenance", amount: "" },
    { description: "Technical Support", amount: "" },
    { description: "Security Patches", amount: "" },
    { description: "Data Backup & Recovery", amount: "" },
    { description: "System Performance Checks", amount: "" },
    { description: "Others", amount: "" },
  ]);

  const [notes, setNotes] = useState("");
  const [termsAndConditions, setTerms] = useState("");
  const [tax, setTax] = useState("");
  const [summary, setSummary] = useState({
    subTotal: 0,
    grandTotal: 0,
  });
  const [invoiceId, setInvoiceId] = useState(""); 


  const [billTo, setBillTo] = useState({
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    companyAddress: '',
  });

  // Fetch "Bill To" data from the backend
  useEffect(() => {
    const fetchBillToDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/addAmcs/billToInvoice/${amcId}`); // Spring Boot URL
        if (response.ok) {
          const data = await response.json();
          setInvoiceId(data.id); 
          setBillTo(data);
        } else {
          console.error("Error fetching 'Bill To' details:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching 'Bill To' details:", error);
      }
    };
    fetchBillToDetails();
  }, [amcId]);

  const handleAmountChange = (index, value) => {
    const updatedItems = [...items];
    updatedItems[index].amount = value ? parseFloat(value) : "";
    setItems(updatedItems);
  };

  const handleTaxChange = (value) => {
    setTax(value ? parseFloat(value) : "");
  };

  const handleSubmit = async () => {
    // Prepare data for the backend
    const invoiceData = {
      items,
      tax: tax || 0,
      notes,
      termsAndConditions,
    };

    console.log("Invoice Data Sent:", invoiceData);

    try {
      const response = await fetch("http://localhost:8080/api/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invoiceData),
      });

      if (response.ok) {
        const data = await response.json();
        setInvoiceId(data.invoiceId);
        setSummary({
          subTotal: data.subTotal || 0,
          grandTotal: data.grandTotal || 0,
        });
      } else {
        console.error("Error calculating totals:", response.statusText);
      }
    } catch (error) {
      console.error("Error connecting to the backend:", error);
    }
  };

  return (
    <div className="invoice-container">
      <Link to="/invoice" className="back-link">←</Link>
      <div className="invoice-left">
       
        <div className="invoice-section">
          <h3>Invoice</h3>
          <p><strong>Invoice Number:</strong>{invoiceId}</p>
          {/* <p><strong>Due Date:</strong> 12 Aug 2020</p> */}
        </div>


        <div className="invoice-from">
          <h3>From</h3>
          <p><strong>Business Name:</strong> Nexa Soft</p>
          <p><strong>Email Address:</strong> nexasoft@mail.com</p>
          <p><strong>Phone Number:</strong> +123 4567 8910</p>
          <p><strong>Address:</strong> Sri Lanka</p>
        </div>

        <div className="invoice-bill-to">
          <h3>Bill To</h3>
          <p><strong>Company Name:</strong>{billTo.companyName}</p>
          <p><strong>Company Email:</strong> {billTo.companyEmail}</p>
          <p><strong>Company Phone:</strong> {billTo.companyPhone}</p>
          <p><strong>Company Address:</strong> {billTo.companyAddress}</p>
        </div>
      </div>

      <div className="invoice-right">
        <table className="invoice-table">
          <thead>
            <tr>
              <th></th>
              <th>Description</th>
              
              
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>🔲</td>
              <td>{item.description}</td>             
              <td>
              <input
                    type="number"
                    value={item.amount}
                    placeholder="Enter Amount"
                    onChange={(e) => handleAmountChange(index, e.target.value)}
                  />
              </td>
            </tr>
             ))}
            
            
          </tbody>
        </table>
        <div className="test1">
        <div className="invoice-notes">
          <h3>Notes</h3>
          <textarea placeholder="Add a note"
           value={notes}
           onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>

        <div className="invoice-terms">

          <h3>Terms & Conditions</h3>
          <textarea placeholder="Terms and Conditions"
            value={termsAndConditions}
            onChange={(e) => setTerms(e.target.value)}
          ></textarea>
        </div>
        </div>
        
        <div className="invoice-summary">
          
        <p>
            <strong>Tax:</strong>
            <input
              type="number"
              vanpm startlue={tax}
              placeholder="Enter Tax"
              onChange={(e) => handleTaxChange(e.target.value)}
            />
          </p>
          <button onClick={handleSubmit}>Calculate</button>
          <p><strong>SubTotal:</strong> Rs{summary.subTotal ? summary.subTotal.toFixed(2) : "0.00"}</p>
          <p className="due-balance">
            <strong>Grand Total:</strong> Rs{summary.grandTotal ? summary.grandTotal.toFixed(2) : "0.00"}
          </p>


        </div>
      </div>
    </div>
  );
}

export default Invoice;

