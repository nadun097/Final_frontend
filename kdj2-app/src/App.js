
import React from "react";
import "./App.css";
import Header from "./component/Header.js";
import Report from "./NavPages/Report.js";
import TrInterface from "./NavPages/TrInterface.js";
import Home from "./NavPages/Home.js";
import Invoice from "./NavPages/Invoice.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/project" element={<TrInterface />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/Report" element={<Invoice />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
