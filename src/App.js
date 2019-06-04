import React, { Component } from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from "./components/Home";
import About from "./components/About";
import Graph from "./components/ConceptGraph";
import ClusterViz from "./components/ClusterViz";
import ArticleViewPopup from "./components/ArticleViewPopup";
import Spinner from "./components/Spinner";
import { CSSTransition } from "react-transition-group";

class App extends Component {
  render() {
    return (
      <Router>
        <div id="app-container">
          <main>
            <Route path="/" exact>
              {({ match }) => (
                <CSSTransition
                  in={match != null}
                  appear={true}
                  timeout={300}
                  classNames="page"
                  unmountOnExit
                >
                  <div className="page">
                    <Home />
                  </div>
                </CSSTransition>
              )}
            </Route>
            <Route path="/about/" component={About} />
            <Route path="/graph/" component={Graph} />
            <Route path="/about/" component={About} />
            <Route
              path="/story/"
              render={() => <ClusterViz width={1440} height={600} />}
            />
            <Route path="/ArticleViewPopup/" component={ArticleViewPopup} />
            <Route path="/spinner/" component={Spinner} />
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
