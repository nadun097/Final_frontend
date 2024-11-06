// src/App.js
import React from "react";
import "./App.css";
import Header from "./component/Header.js";
import About from "./About.js";
import TrInterface from "./TrInterface.js"; 
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/">
            <TrInterface />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
