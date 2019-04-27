import React, { Component } from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from "./components/Home";
import About from "./components/About";
import ClusterViz from "./components/ClusterViz";

import logo from "./logo.png";

class App extends Component {
  NavBar() {
    return (
      <nav>
        <ul>
          <li id="nav-link-1">
            <Link to="/">
              <img id="logo" src={logo} alt="Symposia Logo" />
            </Link>
          </li>
          <li id="nav-link-2">
            <span>
              <Link to="/about/">About</Link>
            </span>
            <a
              href="mailto:pvthejas@uw.edu,jyc24@uw.edu,aman.arya524@gmail.com,lndrgs@uw.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact Us
            </a>
          </li>
        </ul>
      </nav>
    );
  }

  render() {
    return (
      <Router>
        <div id="app-container">
          <Route path="/" exact render={this.NavBar} />
          <main>
            <Route path="/" exact component={Home} />
            <Route path="/about/" component={About} />
            <Route
              path="/cluster/"
              render={() => <ClusterViz width={1440} height={600} />}
            />
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
