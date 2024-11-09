
import React from "react";
import "./App.css";
import Header from "./component/Header.js";
import About from "./About.js";
import TrInterface from "./TrInterface.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<TrInterface />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
