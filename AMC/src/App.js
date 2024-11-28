import React from "react";
import "./App.css";
import Header from "./component/Header";
import Home from "./NavPages/Home";
import KanbanBoardList from "./NavPages/KanbanBoardList";
import Home from "./NavPages/Home";
import AddClient from "./NavPages/AddClient";
import Invoice from "./NavPages/Invoice";
import AddAMC from "./NavPages/AddAMC";
import AMCnavbar from "./component/AMCnavbar";
import Login from "./NavPages/Login";
import JobDetails from "./NavPages/JobDetails";

import VerifyCode from "./component/VerifyCode";
import LandingPage from "./LandingPage";

import ForgotPassword from "./component/ForgotPassword";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import JobDetails from './JobDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/project" element={<KanbanBoardList />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/report" element={<Report />} />
          <Route path="/addClients" element={<AddClient />} />
          <Route path="/addAmc" element={<AddAMC />} />
        </Routes> 

{/* 
      <JobDetails /> */}
   
      </div>
    </Router>
  );
}

export default App;

