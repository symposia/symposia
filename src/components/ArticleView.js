import React, { Component } from "react";
import "./css/ArticleView.css";

class ArticleView extends Component {
  componentDidMount() {
    console.log(this.props.article)
  }

  render() {
    let article = this.props.article;
    return (
      <div className="article-view-container">
        <div className="article-view-exit-container">
          <button onClick={this.props.exitView}> Back </button>
        </div>
        <div className="article-view-main">
          <div className="av-main-header">
            <div className="av-news-source">
              <p>logo here</p>
            </div>
            <div className="av-title">
              <p>title here</p>
            </div>
          </div>
          <div className="av-image">
            <p>image here</p>
          </div>
          <div className="av-details">
            <div className="author">
              <p>authoer here</p>
            </div>
            <div className="concepts">
              <p>concepts here</p>
            </div>
            <div className="date">
              <p>date here</p>
            </div>
            <div className="sentiment">
              <p>sentiment here</p>
            </div>
          </div>
          <div className="av-text">
            <p>{article.body}</p>
            <a href={article.url} target="_blank">Read More...</a>
          </div>
        </div>
        <div>
          <p>sidebar</p>
        </div>
      </div>
    )
  }
}

export default ArticleView;