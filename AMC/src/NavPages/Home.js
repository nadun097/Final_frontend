import React from "react";
import './Home.css';

  function Home() {
    return (
      <div className="dashboard">
        <h2 className="dashboard-title">Dashboard</h2>
  
        <div className="dashboard-container">
          {/* Left Column: Metrics Section */}
          <div className="metrics-section">
            {/* Total Revenues in its own row */}
            <div className="total-revenue-card">
              <h3>Total Revenues</h3>
              <p>R 768,342</p>
            </div>
  
            {/* Total AMC and Active AMC in one row */}
            <div className="bottom-row">
              <div className="metric-card">
                <h4>Total AMC</h4>
                <p className="metric-total">1,137</p>
                <div className="chart-placeholder"></div>
              </div>
  
              <div className="metric-card">
                <h4>Active AMC</h4>
                <p className="metric-active">737</p>
                <div className="chart-placeholder"></div>
              </div>
            </div>
  
            {/* AMC Reminder and Total Users in the next row */}
            <div className="bottom-row">
              <div className="reminder-card">
                <h4>AMC Reminder</h4>
                <div className="reminder-list">
                  <p>Reminder 1</p>
                  <p>Reminder 2</p>
                </div>
              </div>
  
              <div className="metric-card">
                <h4 className="metric-title">Total Users</h4>
                <p className="metric-users">20K</p>
                <div className="chart-placeholder"></div>
              </div>
            </div>
          </div>
  
          {/* Right Column: Data and Chart Sections */}
          <div className="data-chart-section">
            <div className="data-overview">
              <h4>Data</h4>
              <ul className="data-list">
              <li>..........</li>
              <li>..........</li>
              <li>..........</li>
              <li>..........</li>
              <li>..........</li>
              </ul>
            </div>
  
            <div className="chart-section">
              <h4>Data Chart</h4>
              <div className="chart-placeholder"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Home;
  
  