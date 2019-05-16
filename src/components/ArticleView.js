import React, { Component } from "react";
import "./css/ArticleView.css";
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { getDomain } from './Helpers'
import ArticleSentiment from './ArticleSentiment';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class ArticleView extends Component {
  constructor(props) {
    super(props)
    this.onPerspectiveChange = this.onPerspectiveChange.bind(this)
  }

  componentDidUpdate() {
    window.scrollTo(0,0);
  }

  state = {
    differentPerspectives: false,
    concepts: [],
  }

  componentDidMount() {
    let concepts = this.props.article.concepts

    Object.values(concepts).forEach((entry, index) => {
      let currConcept = concepts[index]
      let { uri } = currConcept
      let wikiSearchText = getWikiSearchText(uri)


      fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${wikiSearchText}`)
      .then((resp) => { resp.json()
        .then((data) => {
          Object.assign(currConcept, {description: data.description})
          Object.assign(currConcept, {summary: data.extract_html})
          
          concepts[index] = currConcept
          this.setState({concepts: concepts})  
        })}
      ) 
    })
  }

  generateConceptPopup(conceptPhrase, concept){
    const { description, label, score, summary, uri} = concept

    // console.log(Object.keys(concept))
    // console.log(concept)
    // console.log(summary)

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
        <a href={uri} target="_blank" rel="noopener noreferrer">{ conceptPhrase }</a>
      </Tooltip>

    return conceptPhrasePopup
  }

  onPerspectiveChange(e) {
    console.log("e.target.value", e.target.value)
    if (e.target.checked) {
      this.setState({
        differentPerspectives: e.target.value === "different" ? true : false
      })
    }
  }
  
  render() {
    
    let article = this.props.article;
    let author =
      article.authors.length > 0 ? "By " + article.authors[0].name : null;
    let recs = this.props.getRecs(article.uri)
    let authorElement = (
              <div className="author" style={author ? {marginRight: '20px'} : {}}>
                <p> {author} </p>
              </div>
    )
    return (
      <div className="article-view-container">

        {/* <div className="av-concept-list">
          <div className="concept-list-title">Concepts</div>
            <div className="concepts">
                {article.concepts.map((concept, index) => {
                  // return <ArticleConcept key={index} concept={concept} />;
                  return (
                    <div className="article-concept" key={index}>
                      {this.generateConceptPopup(concept.label.eng, concept)}
                    </div>
                  )
                })}
            </div>
        </div> */}

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
            <div className="first-row">
              {authorElement}

              <a className="match-pre" href={article.url} target="_blank" rel="noopener noreferrer">
                View Source Article
              </a>
            </div>
            <div className="date">
              {article.date}
            </div>
            <ArticleSentiment value={article.sentiment} />
          </div>
          <ArticleText article={this.props.article} />
        </div>
        <div className="av-related-articles">
          <div className="perspectives">
            <label>
              <input type="radio" name="perspectives" value="similar" checked={!this.state.differentPerspectives} onChange={this.onPerspectiveChange}/> 
              <span>Similar Views</span>
            </label> 
            <label>
              <input type="radio" name="perspectives" value="different" checked={this.state.differentPerspectives} onChange={this.onPerspectiveChange}/>  
              <span>Different Views</span>
            </label> 
          </div>
          { !this.state.differentPerspectives ? 
          <div className="related-articles">
            {recs["rec"].map((article, index) => {
              if (!article) {return null}
              return <RelatedArticle key={index} article={article} setView={this.props.setView}/>;
            })}
          </div> : 
          <div className="related-articles">
            {recs["non_rec"].map((article, index) => {
              if (!article) {return null}
              return <RelatedArticle key={index} article={article} setView={this.props.setView}/>;
            })}
          </div> }
        </div>
      </div>
    );
  }
}

class ArticleConcept extends Component {
  render() {
    let concept = this.props.concept;
    return (
      <div className="article-concept">
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
    // let authorText =
    //   article.authors.length > 0 ? "By " + article.authors[0].name : null;
    // let author = authorText ? <div className="ra-author">{authorText}</div> : <div></div>
    let imageURL = article.image
    return (
            <Link 
              style={{textDecoration: "none"}}
              to={ window.location.pathname.substring(
                0,window.location.pathname.lastIndexOf('/')
                ) + "/" + article.uri}
            >
      <div className="related-article" style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(${imageURL}`}} >
        <div className="ra-title" onClick={()=>{this.props.setView(article)}}>{article.title}</div>
        <div>
          <div className="ra-date">{article.date}</div>
          {/* <div className="ra-sentiment">
            <Lens style={{
              margin: 8,
              color: red[400]
            }} />
            {article.sentiment}
          </div> */}
          <ArticleSentiment value={article.sentiment} />
        </div>
        <div className="ra-source"><img src={`http://logo.clearbit.com/${getDomain(article.url)}`} alt="source" /></div>
        {/* <div className="ra-concepts">
          {article.concepts.slice(0, 4).map((concept, index) => {
            return <ArticleConcept key={index} concept={concept} />;
          })}
        </div> */}
        {/* {author} */}
      </div>
      </Link>
    );
  }
}

export default ArticleView;

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

    // console.log(Object.keys(concept))
    // console.log(concept)
    // console.log(summary)

    let conceptPhrasePopup = 
      <Tooltip placement="top"
          leaveTouchDelay = {1000}
          className="concept-tooltip"
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
        <a href={uri} target="_blank" rel="noopener noreferrer">{ conceptPhrase }</a>
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

    let bodySlices = []
    textBlocksIndices.forEach((pair) => {
      bodySlices.push(body.slice(pair.start, parseInt(pair.end)))

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

  getCharIndexOfConcept(concept, dict) {
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
      // console.log(annotatedBody)
      let body = annotatedBody ? annotatedBody : article.body
      return (
            <div className="av-text">
              {body}
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Go to Article
              </a>
            </div>
      )
    
  }
}