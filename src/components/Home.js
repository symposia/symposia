import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./css/Home.css";

import logo from "../logo.svg";
import heroImage from "../images/hero.png";
import step1 from "../images/step1.png";
import step2 from "../images/step2.png";
import step3 from "../images/step3.png";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li id="nav-link-1">
          <Link to="/">
            <div className="logo-wrapper">
              <img id="logo" src={logo} alt="Symposia Logo" />
              <div id="logo-name"> Symposia </div>
            </div>
          </Link>
        </li>
        <li id="nav-link-2">
          <a
            href="mailto:pvthejas@uw.edu,jyc24@uw.edu,aman.arya524@gmail.com,lndrgs@uw.edu"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};
class Home extends Component {
  render() {
    let stories = [
      {
        title: "Avengers: Endgame",
        backgroundImageURL:
          "https://s3-us-west-2.amazonaws.com/symposia/images/avengers-endgame.jpeg",
        path: "avengers-endgame"
      },
      {
        title: "Ukraine Presidency",
        backgroundImageURL:
          "https://s3-us-west-2.amazonaws.com/symposia/images/ukraine-elections.jpg",
        path: "ukraine-elections"
      },
      {
        title: "Joe Biden Candidacy",
        backgroundImageURL:
          "https://s3-us-west-2.amazonaws.com/symposia/images/joe-biden-2020.jpg",
        path: "joe-biden-2020"
      },
      {
        title: "Sri Lanka Terror Attacks",
        backgroundImageURL:
          "https://s3-us-west-2.amazonaws.com/symposia/images/sri-lanka-attacks.jpg",
        path: "sri-lanka-attacks"
      }
    ];

    return (
      <div id="home-container">
        <NavBar />
        <section id="hero" style={{ backgroundImage: `url(${heroImage})` }}>
          <h1>A Bird's Eye Perspective of the News</h1>
          <h2>
            A fractured media landscape is making us less informed. We want to
            do something about it.
          </h2>
        </section>
        <section className="stories">
          <h1>Top Stories</h1>
          <div id="featured-stories">
            {stories.map((story, index) => {
              return (
                <StoryCard
                  key={index}
                  title={story.title}
                  backgroundImage={story.backgroundImageURL}
                  path={story.path}
                />
              );
            })}
          </div>
        </section>
        <section className="how-it-works">
          <h1>How it Works</h1>
          <div>
            <p>
              Symposia is a news research web application that offers
              analytics and insights into popular news stories by analyzing news
              articles from media sources.
            </p>
            <img src={step1} />
          </div>
          <div>
            <p>
              We group articles together based on similar perspectives and
              concepts, allowing you to see the bigger picture
            </p>
            <img src={step2} />
          </div>
          <div>
            <p>
              We give users insights into the articles they read, right where
              they need them
            </p>
            <img src={step3} />
          </div>
        </section>
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

export default Home;
