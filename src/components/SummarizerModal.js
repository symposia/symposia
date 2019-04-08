import React, { Component } from "react";
import "./css/SummarizerModal.css";

function getDomain(url) {
  var result;
  var match;
  if (
    (match = url.match(
      /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im
    ))
  ) {
    result = match[1];
    if ((match = result.match(/^[^\.]+\.(.*\..*\..+)$/))) {
      result = match[1];
    }
  }
  return result;
}

class SummarizerModal extends Component {

  render() {
    return (
      <div className="summarizer-modal-container">
        <div className="summarizer-modal-articles">
          <ArticleInSummarizerModal article={this.props.article1}/>
          <ArticleInSummarizerModal article={this.props.article2}/>
        </div>
        <button onClick={this.props.handleModalClose}>close modal</button>
      </div>
    );
  }
}

export default SummarizerModal;

class ArticleInSummarizerModal extends Component {
  state = {
    article: null,
  };

  componentDidMount() {
    console.log("ArticleSummarizerModal: ", this.props.article)
    this.setState({
      article: this.props.article
    })
  }

  render() {
    let article = this.state.article;

    if (!article) {
      return null;
    }

    return (
      <div class="summarized-article-container">
        <img alt="article logo" src={"http://logo.clearbit.com/" + getDomain(article.url)} />
        <h1 className="summarized-article-title"> {article.title} </h1>
        <div className="summarized-article-date"> {article.date} </div>
        <div> Who </div>
        <div> What </div>
        <div> Where</div>
        <div> When </div>
        <div> Why </div>
      </div>
    );
  }
}
