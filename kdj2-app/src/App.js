// src/App.js
import React from "react";
import "./App.css";
import Header from "./component/Header.js";
import { BrowserRouter as Router,Route,Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;
