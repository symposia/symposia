import React, { Component } from "react";
import "./css/ArticleView.css";

class ArticleView extends Component {
  componentDidMount() {
    console.log(this.props.article);
  }

  render() {
    let article = this.props.article;
    let author =
      article.authors.length > 0 ? "By " + article.authors[0].name : null;
    let relatedArticles = this.props.relatedArticles;

    return (
      <div className="article-view-container">
        <div className="article-view-exit-container">
          <button onClick={this.props.exitView}> Back </button>
        </div>
        <div className="article-view-main">
          <div className="av-main-header">
            <div className="av-news-source">
              <img
                src={"http://logo.clearbit.com/" + getDomain(article.source.uri)}
                alt="news source"
              />
            </div>
            <div className="av-title">
              <h1>{article.title}</h1>
            </div>
          </div>
          <div className="av-image">
            <img src={article.image} alt={article.title} />
          </div>
          <div className="av-details">
            <div className="author">
              <p> {author} </p>
            </div>
            <div className="concepts">
              {article.concepts.slice(0, 4).map((concept, index) => {
                return <ArticleConcept key={index} concept={concept} />;
              })}
            </div>
            <div className="date">
              <p>{article.date}</p>
            </div>
            <div className="sentiment">
              <p>sentiment: {article.sentiment}</p>
            </div>
          </div>
          <div className="av-text">
            <p>{article.body}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read More...
            </a>
          </div>
        </div>
        <div>
          <h3>Related Articles</h3>
          <div className="av-related-articles">
            {relatedArticles.map((article, index) => {
              return <RelatedArticle key={index} article={article} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}

class ArticleConcept extends Component {
  render() {
    let concept = this.props.concept;
    return (
      <div>
        <a href={concept.uri} target="_blank" rel="noopener noreferrer">
          {" "}
          {concept.label.eng}{" "}
        </a>
      </div>
    );
  }
}

class RelatedArticle extends Component {
  render() {
    let article = this.props.article;
    let author =
      article.authors.length > 0 ? "By " + article.authors[0].name : null;
    return (
      <div className="related-article">
        <div className="ra-title">{article.title}</div>
        <div className="ra-sentiment">{article.sentiment}</div>
        <div className="ra-concepts">
          {article.concepts.slice(0, 4).map((concept, index) => {
            return <ArticleConcept key={index} concept={concept} />;
          })}
        </div>
        {author != null ? <div className="ra-author">
          {author}
        </div> : <div></div>}
      </div>
    );
  }
}

export default ArticleView;

function getDomain(url) {
  if (url == null) {
      return '';
  }

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