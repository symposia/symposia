import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./css/Home.css";
import cnnLogo from "../images/news-sources/CNN.svg";
import bbcLogo from "../images/news-sources/BBC.svg";
import bloombergLogo from "../images/news-sources/Bloomberg.svg";
import nytimesLogo from "../images/news-sources/NewYorkTimes.svg";

class Home extends Component {
  render() {
    let stories = [
      {
        title: "Avengers: Endgame",
        backgroundImageURL: "https://s3-us-west-2.amazonaws.com/symposia/images/avengers-endgame.jpeg",
        path:"avengers-endgame"
      },
      {
        title: "Ukraine Elections",
        backgroundImageURL: "https://s3-us-west-2.amazonaws.com/symposia/images/ukraine-elections.jpg",
        path:"ukraine-elections"
      },
      {
        title: "Jode Biden 2020",
        backgroundImageURL: "https://s3-us-west-2.amazonaws.com/symposia/images/joe-biden-2020.jpg",
        path:"joe-biden-2020"
      },
      {
        title: "Sri Lanka Attacks",
        backgroundImageURL: "https://s3-us-west-2.amazonaws.com/symposia/images/sri-lanka-attacks.jpg",
        path:"sri-lanka-attacks"
      },
    ]
    return (
      <div id="home-container">
        <section id="hero">
          <h1>Symposia</h1>
          <h2>A Bird’s Eye Perspective of the News</h2>
        </section>
        <section id="featured-stories">
          {stories.map((story, index) => {
            return <StoryCard
              key={index}
              title={story.title}
              backgroundImage={story.backgroundImageURL}
              path={story.path}
            />
          })}
          {/* <StoryCard
            title="Government Shutdown"
            backgroundImage="https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/President_Trump_Meets_With_Congressional_Leadership_%2845966024294%29.jpg/640px-President_Trump_Meets_With_Congressional_Leadership_%2845966024294%29.jpg"
            path="shutdown"
          />
          <StoryCard
            title="Venezuelan Crisis"
            backgroundImage="https://upload.wikimedia.org/wikipedia/commons/b/b8/Venezuelan_protests_-_23_January_2019.jpg"
            path="venezuela"
          /> */}
        </section>
        {/* <section id="news-sources-container">
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
        </section> */}
      </div>
    );
  }
}

class StoryCard extends Component {
  render() {
    return (
      <Link to={"/story/" + this.props.path} className="story-card-container">
        <div
          className="story-card"
          style={{
            backgroundImage: `linear-gradient(0deg,rgba(0,0,0,0.8),rgba(0,0,0,0)),url(${
              this.props.backgroundImage
            })`
          }}
        >
          <div className="title">{this.props.title}</div>
        </div>
      </Link>
    );
  }
}

function NewsLogo(props) {
  return <img className="news-logo" src={props.image} alt={props.title} />;
}

export default Home;
