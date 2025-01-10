
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Home.css';

import firstGraph from '../assets/firstGraph.png';
import secondGraph from '../assets/secondGraph.jpg';
import lastGraph from '../assets/lastGraph.png';
import dataGraph from '../assets/dataGraph.png';

function Home() {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/feedback") // API endpoint
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch feedbacks");
                }
                return response.json();
            })
            .then(data => setFeedbacks(data))
            .catch(error => console.error("Error fetching feedbacks:", error));
    }, []);

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                {/* Back Link */}
                <Link to="/login" className="back-link">←</Link>
                <h2 className="dashboard-title">Dashboard</h2>
            </div>

            <div className="dashboard-container">
                {/* Left Column: Metrics Section */}
                <div className="metrics-section">
                    <div className="total-revenue-card">
                        <h3>Total Revenues</h3>
                        <p>R 768,742</p>
                    </div>
                    <div className="bottom-row">
                        <div className="metric-card">
                            <h4>Total AMC</h4>
                            <p className="metric-total">1,137</p>
                            <img src={firstGraph} alt="Total AMC Chart" className="chart-placeholder total-amc-chart" />
                        </div>
                        <div className="metric-card">
                            <h4>Active AMC</h4>
                            <p className="metric-active">737</p>
                            <img src={secondGraph} alt="Active AMC Chart" className="chart-placeholder active-amc-chart" />
                        </div>
                    </div>
                    <div className="bottom-row">
                        <div className="reminder-card">
                            <h4>AMC Reminder</h4>
                            <div className="reminder-list">
                                <p>Reminder 1</p>
                                <p>Reminder 2</p>
                            </div>
                        </div>
                        <div className="metric-card">
                            <h4>Total Users</h4>
                            <p className="metric-users">20K</p>
                            <img src={lastGraph} alt="Total Users Chart" className="chart-placeholder total-users-chart" />
                        </div>
                    </div>
                </div>

                <div className="data-chart-section">
                    <div className="data-overview">
                        <h4>Feedbacks</h4>
                        <div className="feedback-section">
                            <ul className="data-list">
                                {feedbacks.length > 0 ? (
                                    feedbacks.map((feedback) => (
                                        <li key={feedback.id} className="feedback-item">
                                            {feedback.companyName} - <em>{feedback.feedback}</em>
                                        </li>
                                    ))
                                ) : (
                                    <p>No feedback available.</p>
                                )}
                            </ul>
                        </div>
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
