import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Home.css";

const Home = () => {
  return (
    <div id="home-container">
      <section id="hero">
        <h1>Find the Balance</h1>
        <h2>the truth is in the spectrum</h2>
      </section>
      <StoryCard />
      <StoryCard />
      <StoryCard />
      <section id="news-sources-container">
        <h3>News sources we parse through</h3>
        <div id="news-sources">
          <ul>
            <li>CNN</li>
            <li>BBC</li>
            <li>NYTimes</li>
            <li>Source</li>
            <li>Source</li>
            <li>Source</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

class StoryCard extends Component {
  render() {
    return (
      <Link to="/spectrum/">
        <div class="story-card">
          <span>Title</span>
        </div>
      </Link>
    );
  }
}

export default Home;
