import React from "react";
import "./App.css";
import Header from "./component/Header";
import Report from "./NavPages/Report";
import KanbanBoardList from "./NavPages/KanbanBoardList";
import Home from "./NavPages/Home";
import AddClient from "./NavPages/AddClient";
import Invoice from "./NavPages/Invoice";
import AddAMC from "./NavPages/AddAMC";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import JobDetails from './JobDetails';

function App() {
  return (
    <Router>
      <div className="App">
       <Header />
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
      <JobDetails />  */}
   
      </div>
      
    </Router>
  );
}

export default App;
