import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Home.css";
import cnnLogo from "../images/news-sources/CNN.svg";
import bbcLogo from "../images/news-sources/BBC.svg";
import bloombergLogo from "../images/news-sources/Bloomberg.svg";
import nytimesLogo from "../images/news-sources/NewYorkTimes.svg";

const Home = () => {
  return (
    <div id="home-container">
      <section id="hero">
        <h1>Find the Balance</h1>
        <h2>the truth is in the spectrum</h2>
      </section>
      <StoryCard
        title="Huawei CFO Arrest"
        backgroundImage="https://upload.wikimedia.org/wikipedia/commons/1/14/Meng_Wanzhou_at_Russia_Calling%21_Investment_Forum.jpg"
      />
      <StoryCard
        title="Government Shutdown"
        backgroundImage="https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/President_Trump_Meets_With_Congressional_Leadership_%2845966024294%29.jpg/640px-President_Trump_Meets_With_Congressional_Leadership_%2845966024294%29.jpg"
      />
      <StoryCard
        title="Venezuelan Crisis"
        backgroundImage="https://upload.wikimedia.org/wikipedia/commons/3/30/2017_Venezuelan_protests_flag.jpg"
      />
      <section id="news-sources-container">
        <h3>News sources we parse through</h3>
        <div id="news-sources">
          <ul>
            <li>
              <NewsLogo title="CNN" image={cnnLogo} />
            </li>
            <li>
              <NewsLogo title="BBC" image={bbcLogo} />
            </li>
            <li>
              <NewsLogo title="Bloomberg" image={bloombergLogo} />
            </li>
            <li>
              <NewsLogo title="New York Times" image={nytimesLogo} />
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

class StoryCard extends Component {
  render() {
    return (
      <Link to="/spectrum/" class="story-card-container">
        <div
          class="story-card"
          style={{
            backgroundImage: `linear-gradient(0deg,rgba(0,0,0,0.8),rgba(0,0,0,0)),url(${
              this.props.backgroundImage
            })`
          }}
        >
          <div class="title">{this.props.title}</div>
        </div>
      </Link>
    );
  }
}

function NewsLogo(props) {
  return <img class="news-logo" src={props.image} alt={props.title} />;
}

export default Home;
