import React from 'react';
import './Invoice.css';

function Invoice() {
  return (
    <div className="invoice-container">
      <div className="invoice-left">
       
        <div className="invoice-section">
          <h3>Invoice</h3>
          <p><strong>Invoice Number:</strong> #123</p>
          <p><strong>Due Date:</strong> 12 Aug 2020</p>
        </div>

        <div className="invoice-from">
          <h3>From</h3>
          <p><strong>Business Name:</strong> Jhono Doe</p>
          <p><strong>Email Address:</strong> example@mail.com</p>
          <p><strong>Phone Number:</strong> +123 4567 8910</p>
          <p><strong>Address:</strong> Your Office Address</p>
        </div>

        <div className="invoice-bill-to">
          <h3>Bill To</h3>
          <p><strong>Client Name:</strong> Jhono Smith</p>
          <p><strong>Email Address:</strong> email@example.com</p>
          <p><strong>Phone Number:</strong> +123 4567 8910</p>
          <p><strong>Address:</strong> Your Office Address</p>
        </div>
      </div>

      <div className="invoice-right">
        <table className="invoice-table">
          <thead>
            <tr>
              <th>Add</th>
              <th>Description</th>
              <th>Rate</th>
              <th>QTY</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>🔲</td>
              <td>User Interface Design</td>
              <td>£200.00</td>
              <td>2</td>
              <td>£400.00</td>
            </tr>
            <tr>
              <td>🔲</td>
              <td>Web Template Design</td>
              <td>£250.00</td>
              <td>2</td>
              <td>£500.00</td>
            </tr>
            <tr>
              <td>🔲</td>
              <td>Dashboard Template Design</td>
              <td>£300.00</td>
              <td>2</td>
              <td>£600.00</td>
            </tr>
            
            <tr>
              <td colSpan="4">Item Description</td>
              <td>0.00</td>
            </tr>
          </tbody>
        </table>

        <button className="add-item-btn">Add Item +</button>
        <div className="test1">
        <div className="invoice-notes">
          <h3>Notes</h3>
          <textarea placeholder="Add a note"></textarea>
        </div>

        <div className="invoice-terms">

          <h3>Terms & Conditions</h3>
          <textarea placeholder="Terms and Conditions"></textarea>
        </div>
        </div>
        
        <div className="invoice-summary">
          <p><strong>SubTotal:</strong> £2000.00</p>
          <p><strong>Tax:</strong> 10% - £200.00</p>
          <p><strong>Paid Amount:</strong> £2000.00</p>
          <p className="due-balance"><strong>Due Balance:</strong> £400.00</p>
        </div>
      </div>
    </div>
  );
}

export default Invoice;

