import React, { Component } from "react";
import "./css/ArticleView.css";

class ArticleView extends Component {
  componentDidMount() {
    console.log(this.props.article)
  }

  render() {
    return (
      <div className="article-view-container">
        <button onClick={this.props.exitView}> Back </button>
        <p>article view</p>
      </div>
    )
  }
}

export default ArticleView;