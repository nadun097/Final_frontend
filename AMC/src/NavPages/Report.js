import React from "react";
import './Report.css';

 function Report() {
  return (
    <nav className="navbar">
    <ul className="navbar-list">
      <li><a href="/fullAmc">Full AMC</a></li>
      <li><a href="/amcPayment">AMC PAYMENT</a></li>
      <li><a href="/clientWiseAmc">CLIENT WISE AMC</a></li>
      <li><a href="/amcClientDetails">AMC CLIENT DETAILS</a></li>
      <li><a href="/renewalAmcs">RENEWAL AMCs</a></li>
      <li><a href="/scheduledAmc">SCHEDULED AMC</a></li>
    </ul>
  </nav>
  );
}
export default Report;
