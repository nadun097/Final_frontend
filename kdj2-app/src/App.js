// src/App.js
import React from "react";
import "./App.css";
import Header from "./component/Header.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/">
            <div>
              {/* Your main interface component or content goes here */}
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
