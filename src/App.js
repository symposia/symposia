import React, { Component } from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from "./components/Home";
import Spectrum from "./components/Spectrum";

class App extends Component {
  render() {
    return (
      <Router>
        <div id="app-container">
          <nav>
            <ul>
              <li id="nav-link-1">
                <Link to="/">Home</Link>
              </li>
              <li id="nav-link-2">
                <Link to="/about/">About</Link>
              </li>
              <li id="nav-link-3">
                <a href="mailto:pvthejas@uw.edu,jyc24@uw.edu,aman.arya524@gmail.com,lndrgs@uw.edu">
                  Contact Us
                </a>
              </li>
            </ul>
          </nav>

          <main>
            <Route path="/" exact component={Home} />
            <Route path="/about/" component={About} />
            <Route path="/spectrum/" component={Spectrum} />
          </main>
        </div>
      </Router>
    );
  }
}

const About = () => <h2> About </h2>;

export default App;
