import React, { Component } from "react";
import "./css/ArticleView.css";
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { getDomain } from './Helpers'
import Lens from '@material-ui/icons/Lens';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import Button from '@material-ui/core/Button';

class ArticleView extends Component {

  componentDidUpdate() {
    window.scrollTo(0,0);
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
        <div className="article-view-exit-container">
          {/* <Button variant="contained" onClick={this.props.exitView}> 
            Back to Articles 
          </Button> */}
          {/* <button onClick={this.props.exitView}> Back to Story </button> */}
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
            <div className="first-row">
              {authorElement}
              {/* <div className="concepts">
                {article.concepts.slice(0, 4).map((concept, index) => {
                  return <ArticleConcept key={index} concept={concept} />;
                })}
              </div> */}
            </div>
            <div className="date">
              {article.date}
            </div>
            {/* <div className="sentiment">
              <Lens style={{
                margin: 8,
                color: red[400]
              }} />
              {article.sentiment}
            </div> */}
            <ArticleSentiment value={article.sentiment} />
          </div>
          <ArticleText article={this.props.article} />
        </div>
        <div>
          <h3>Similar Perspectives</h3>
          <div className="av-related-articles">
            {recs["rec"].map((article, index) => {
              if (!article) {return null}
              return <RelatedArticle key={index} article={article} setView={this.props.setView}/>;
            })}
          </div>
          <h3>Alternate Prespectives</h3>
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
    console.log(article);
    let authorText =
      article.authors.length > 0 ? "By " + article.authors[0].name : null;
    let author = authorText ? <div className="ra-author">{authorText}</div> : <div></div>
    let imageURL = article.image
    return (
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
    );
  }
}

export default ArticleView;

// function getDomain(url) {
//   if (url == null) {
//       return '';
//   }

//   var result;
//   var match;

//   if (
//       (match = url.match(
//       /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im
//       ))
//   ) {
//       result = match[1];
//       if ((match = result.match(/^[^\.]+\.(.*\..*\..+)$/))) {
//       result = match[1];
//       }
//   }
//   return result;
// }

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

export function ArticleSentiment(props) {
  let value = parseFloat(props.value)
  let color = grey[600];
  let label = "Neutral"
  // [-1,-.6] [-.6,-.2] [-.2,.2] [.2,.6] [.6,1]
  if (-1 <= value && value <= -.6) {
    color = red[900];
    label = "Very Negative"
  } else if (-.6 <= value && value <= -.2) {
    color = red[400];
    label = "Negative"
  } else if (-.2 <= value && value <= .2) {
    color = grey[600];
    label = "Neutral"
  } else if (.2 <= value && value <= .6) {
    color = green[600];
    label = "Positive"
  } else if (.6 <= value && value <= 1) {
    color = green[900];
    label = "Very Positive"
  }

  return (
    <div className="sentiment">
    <Lens style={{
      margin: 8,
      color: color
    }} />
      {label} 
  </div>
  )
}
