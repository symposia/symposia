import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import heroImage from "../images/hero.png";
import "./css/Home.css";

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
        title: "Ukraine Elections",
        backgroundImageURL:
          "https://s3-us-west-2.amazonaws.com/symposia/images/ukraine-elections.jpg",
        path: "ukraine-elections"
      },
      {
        title: "Joe Biden 2020",
        backgroundImageURL:
          "https://s3-us-west-2.amazonaws.com/symposia/images/joe-biden-2020.jpg",
        path: "joe-biden-2020"
      },
      {
        title: "Sri Lanka Attacks",
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
        <section id="featured-stories">
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
