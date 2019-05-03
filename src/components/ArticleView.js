import React, { Component } from "react";
import "./css/ArticleView.css";
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

class ArticleView extends Component {
  
  render() {
    
    let article = this.props.article;
    let author =
      article.authors.length > 0 ? "By " + article.authors[0].name : null;
    let relatedArticles = this.props.relatedArticles;
    let recs = this.props.getRecs(article.uri)

    return (
      <div className="article-view-container">
        <div className="article-view-exit-container">
          <button onClick={this.props.exitView}> Back to Story </button>
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
          <ArticleText article={this.props.article} />
        </div>
        <div>
          <h3>Related Articles</h3>
          <div className="av-related-articles">
            {recs["rec"].map((article, index) => {
              if (!article) {return null}
              return <RelatedArticle key={index} article={article} setView={this.props.setView}/>;
            })}
          </div>
          <h3>Alternate Viewpoints</h3>
          <div className="av-related-articles">
            {recs["non_rec"].map((article, index) => {
              if (!article) {return null}
              return <RelatedArticle key={index} article={article} setView={this.props.setView}/>;
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
        <div className="ra-title" onClick={()=>{this.props.setView(article)}}>{article.title}</div>
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

function getWikiSearchText(url) {
  if(url == null) {
    return ''
  }

  let result = url.substring(url.lastIndexOf("/") + 1, url.length)
  result = result.replace(/_/g, ' ')
  
  return result;
}

class ArticleText extends Component {
  constructor(props) {
    super(props)
    this.state = {
      concepts: [],
    }  
  }

  componentDidMount(props) {
    let concepts = this.props.article.concepts
    
    Object.values(concepts).forEach((entry, index) => {
      let currConcept = concepts[index]
      let { uri } = currConcept
      let wikiSearchText = getWikiSearchText(uri)

 
      fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${wikiSearchText}`)
      .then((resp) => { resp.json()
        .then((data) => {
          Object.assign(currConcept, {description: data.description})
          // currConcept = {...currConcept, ...{description: data.description}}
          Object.assign(currConcept, {summary: data.extract_html})
          
          concepts[index] = currConcept
          this.setState({concepts: concepts})  
        })}
      ) 
    })
  }


  
  generateOrderOfConcepts(concepts) {
    concepts = this.state.concepts
    let orderOfConcepts = {}
    let prevWordLength = 0
    concepts.forEach((concept) => {
      this.getCharIndexOfConcept(concept, orderOfConcepts, prevWordLength)
    })
    return this.generateTextBlocks(orderOfConcepts)
  }

  generateConceptPopup(conceptPhrase, concept){
    const { description, label, score, summary, uri} = concept

    console.log(Object.keys(concept))
    console.log(concept)
    console.log(summary)

    let conceptPhrasePopup = 
      <Tooltip placement="top"
          leaveTouchDelay = {1000}
          title={
            <Typography color="inherit">
              <p className="popup-title">
                {label.eng}
              </p>
              <p>
                <b className="popup-subtitles">{"Relevancy Score: "}</b>{score}
              </p>
              <p className="popup-description">
                {description}
              </p>
              <p>
              <div className="popup-summary" dangerouslySetInnerHTML={{ __html: summary }} />

                {/* {summary} */}
              </p>
              
            </Typography>
          }
        >
        <a href={uri}>{ conceptPhrase }</a>
      </Tooltip>

    return conceptPhrasePopup
  }

  generateTextBlocks(orderOfConcepts) {
    let body = this.props.article.body
    let textBlocksIndices = []
    let start = 0
    for (let key in orderOfConcepts) {
      textBlocksIndices.push({start: start, end: key})
      start = parseInt(key) + orderOfConcepts[key].label.eng.length
    }
    textBlocksIndices.push({start: start, end: body.length})

    // console.log("OrderOfConcepts:", orderOfConcepts)

    let bodySlices = []
    textBlocksIndices.forEach((pair) => {
      bodySlices.push(body.slice(pair.start, parseInt(pair.end)))

      // if (index < textBlocksIndices.length - 1) {
      //   let nextConcept = orderOfConcepts[pair.end]
      //   let word = nextConcept.label.eng
      // }
    })
    let keys = Object.keys(orderOfConcepts)

    let annotatedText = (
      <pre>
        {bodySlices.map((slice, index) => {
          let conceptPhrasePopup = null
          if (index < bodySlices.length - 1) {
            let conceptPhrase = null
            let key = keys[index]
            let concept = orderOfConcepts[key]
            conceptPhrase = (
              <span className="concept-phrase" href={concept.uri}>
                {concept.label.eng}
              </span>
            )

            conceptPhrasePopup = this.generateConceptPopup(conceptPhrase, concept)

            // conceptPhrasePopup = conceptPhrase
          } else {
            conceptPhrasePopup = null
          }

          return (
            <span key={index}>
              {slice}
              {conceptPhrasePopup}
            </span>
          )
        })}
      </pre>
    )

    return annotatedText
  }

  getCharIndexOfConcept(concept, dict, prevWordLength) {
    let phrase = concept.label.eng
    let articleBody = this.props.article.body
    let index = articleBody.indexOf(phrase) 
    if (index >= 0) {
      dict[index] = concept
    }
  }

  render() {
      let article = this.props.article
      let concepts = this.state.concepts
      let annotatedBody = this.generateOrderOfConcepts(concepts)
      console.log(annotatedBody)
      let body = annotatedBody ? annotatedBody : article.body
      return (
            <div className="av-text">
              {body}
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read More...
              </a>
            </div>
      )
    
  }
}

// class ArticleTextPopup
