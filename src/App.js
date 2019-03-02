import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Index = () => <h2> Home </h2>;
const Why = () => <h2> Why </h2>;

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/why/">Why</Link>
              </li>
              <li>
                <a href="mailto:pvthejas@uw.edu,jyc24@uw.edu,aman.arya524@gmail.com,lndrgs@uw.edu">
                  Contact Us
                </a>
              </li>
            </ul>
          </nav>

          <Route path="/" exact component={Index} />
          <Route path="/why/" component={Why} />
        </div>
      </Router>
    );
  }
}

export default App;
