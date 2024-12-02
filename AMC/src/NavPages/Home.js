import React from "react";
import { Link } from "react-router-dom";
import './Home.css';


import firstGraph from '../assets/firstGraph.png';
import secondGraph from '../assets/secondGraph.jpg';
import lastGraph from '../assets/lastGraph.png';
import dataGraph from '../assets/dataGraph.png';
  
    function Home() {
      return (
        <div className="dashboard">

          <div className="dashboard-header">
        {/* Back Link */}
        <Link to="/login" className="back-link">
          ←
        </Link>
          
          <h2 className="dashboard-title">Dashboard</h2>
          </div>
    
          <div className="dashboard-container">
            {/* Left Column: Metrics Section */}
            <div className="metrics-section">
              {/* Total Revenues in its own row */}
              <div className="total-revenue-card">
                <h3>Total Revenues</h3>
                <p>R 768,742</p>
              </div>
    
              {/* Total AMC and Active AMC in one row */}
              <div className="bottom-row">
                <div className="metric-card">
                  <h4>Total AMC</h4>
                  <p className="metric-total">1,137</p>
                  <img src={firstGraph} alt="Total AMC Chart" className="chart-placeholder total-amc-chart"/>
                </div>
    
                <div className="metric-card">
                  <h4>Active AMC</h4>
                  <p className="metric-active">737</p>
                  <img src={secondGraph} alt="Active AMC Chart" className="chart-placeholder active-amc-chart" />
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
                  <img src={lastGraph} alt="Total Users Chart" className="chart-placeholder total-users-chart" />
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
                <img src={dataGraph} alt="Data Chart" className="chart-placeholder data-chart" />
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    export default Home;