import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <header>
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

          <main>
            <Route path="/" exact component={Home} />
            <Route path="/why/" component={Why} />
          </main>
        </header>
      </Router>
    );
  }
}

const Home = () => <h2> Home </h2>;
const Why = () => <h2> Why </h2>;

export default App;
