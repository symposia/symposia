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

  componentDidMount(){
    console.log("Summary 1:", this.props.summary1)
    console.log("Summary 2:", this.props.summary2)
  }

  render() {
    return (
      <div className="summarizer-modal-container">
        <div className="close-button-container">
          <button className="summarizer-modal-close-button my-btn" onClick={this.props.handleModalClose}>Close</button>
        </div>
        <div className="summarizer-modal-articles">
          <ArticleInSummarizerModal article={this.props.article1} summary={this.props.summary1}/>
          <ArticleInSummarizerModal article={this.props.article2} summary={this.props.summary2}/>
        </div>
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
      article: this.props.article,
      summary: this.props.summary
    })
  }

  render() {
    let article = this.state.article;
    let summary = this.state.summary;

    if (!article) {
      return null;
    }

    return (
      <div className="article-summary-container">
        <img className="article-summary-logo" alt="article logo" src={"http://logo.clearbit.com/" + getDomain(article.url)} />
        <h1 className="article-summary-title"> {article.title} </h1>
        <div className="article-summary-date"> {article.date} </div>
        <div className="summary-text">
          <div className="summary-label"> 
            Who: 
          </div>
          <div className="summary-value">
            {summary.who} 
          </div>
          <div className="summary-label"> 
            What: 
          </div>
          <div className="summary-value">
            {summary.what} 
          </div>
          <div className="summary-label"> 
            Where: 
          </div>
          <div className="summary-value">
            {summary.where} 
          </div>
          <div className="summary-label"> 
            Why: 
          </div>
          <div className="summary-value">
            {summary.why} 
          </div>
          <div className="summary-label"> 
            How: 
          </div>
          <div className="summary-value">
            {summary.how} 
          </div>
        </div>
      </div>
    );
  }
}
