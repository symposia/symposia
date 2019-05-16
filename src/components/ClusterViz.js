import React, { Component } from "react";
import * as d3 from "d3";
import $ from "jquery";
import "./css/ClusterViz.css";
import ZoomSlider from "./ZoomSlider";
import StoryGrid from "./StoryGrid";
import Popup from "./Popup";
import Bookmark from "./Bookmark";
import { PropTypes } from 'react';
import { ReactContext } from '../Context'
import SummarizerModal from "./SummarizerModal";
import SearchAppBar from "./SearchAppBar";
import FilterBar from "./FilterBar";
import ArticleView from "./ArticleView"

class ClusterViz extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      sources: null,
      days: null,
      title: "",
      concept: null,
      sentiment: null,
      bookmarkList: new Map(),
      filteredSources: null,
      tags: null,
      clusterNum: 0,
      summaries: null,
      selectSecond: false,
      showSummarizerModal: false,
      articleToView: null,
      recs: null
    };

    this.getFirst = this.getFirst.bind(this);
    this.getSecond = this.getSecond.bind(this);
    this.selectSecond = this.selectSecond.bind(this);
    this.setFilterSource = this.setFilterSource.bind(this);
    this.setDayFilter = this.setDayFilter.bind(this);
    this.setSentiment = this.setSentiment.bind(this);
    this.setConcepts = this.setConcepts.bind(this);
    this.setArticleToView = this.setArticleToView.bind(this)
    this.leaveArticleView = this.leaveArticleView.bind(this)
    this.getRecs = this.getRecs.bind(this)
    
  }

  componentWillMount() {
    let segment_str = window.location.pathname; // return segment1/segment2/segment3/segment4
    let segment_array = segment_str.split("/");
    let last_segment = segment_array.pop();
    let title;
    let dataIsClustered = false;
    let recsURL;
    let fileName

    //handling click actions on homepage of articles
    switch (last_segment) {
      case "avengers-endgame":
        title = "Avengers: Endgame' Obliterates Records With $1.2 Billion Global Debut"
        recsURL = "https://s3-us-west-2.amazonaws.com/symposia/recommendations/avengers-endgame-rec.json"
        dataIsClustered = true
        fileName = "avengers-cluster.json"
        break;
      case "sri-lanka-attacks":
        title = "Sri Lanka Attacks"
        recsURL = "https://s3-us-west-2.amazonaws.com/symposia/recommendations/sri-lanka-attacks-rec.json"
        dataIsClustered = true
        fileName = "sri-lanka-cluster.json"
        break;
      case "joe-biden-2020":
        title = "Joe Biden Announces 2020 Presidential Campaign"
        recsURL = "https://s3-us-west-2.amazonaws.com/symposia/recommendations/joe-biden-2020-rec.json"
        dataIsClustered = true
        fileName = "joe-biden-cluster.json"
        break;
      case "ukraine-elections":
        title = "Comedian wins Ukranian Presidential Elections"
        recsURL = "https://s3-us-west-2.amazonaws.com/symposia/recommendations/ukraine-elections-rec.json"
        dataIsClustered = true
        fileName = "ukraine-cluster.json"
        break;
      default:
    }

    if (dataIsClustered) {
      const dataURL = `https://s3-us-west-2.amazonaws.com/symposia/clusters/${fileName}`
      fetch(dataURL)
        .then(resp => resp.json())
        .then(clusteredData => {
          this.setState({
            data: clusteredData,
            tags: this.createFakeConcepts(),
            title: title
          })
        })
    } else {
      // const dataURL = `https://s3-us-west-2.amazonaws.com/symposia/articles/${last_segment}.json`
      // fetch(dataURL)
      //   .then(resp => resp.json())
      //   .then(rawArticles => {
      //     let clusteredArticles = this.createFakeClusters(rawArticles)
      //     // // console.log(clusteredArticles)
      //     this.setState({
      //       data: clusteredArticles,
      //       tags: this.createFakeConcepts(),
      //       title: title
      //     })
      //   })
    }
      fetch(recsURL)
        .then(resp => resp.json())
        .then(recs => this.createRecsDict(recs))

  }

  createRecsDict(recs) {
    let recsDict = {}
    recs.forEach(rec => {
      let key = Object.keys(rec)[0]
      let value = Object.values(rec)[0]
      recsDict[key] = value
    })
    this.setState({recs: recsDict})
  }

  getRecs(key) {
    let recObj = {}
    recObj["rec"] = [] 
    recObj["non_rec"] = []

    if (!(key in this.state.recs)) {return recObj}
    let recURIObj = this.state.recs[key]


    recURIObj.rec.forEach(uri => {
      let article = this.getArticleByURI(uri)
      // // console.log(typeof(uri), uri)
      recObj["rec"].push(article)
    })
    recURIObj.non_rec.forEach(uri => {
      // // console.log(uri)
      recObj["non_rec"].push(this.getArticleByURI(uri))
    })

    return recObj
  }

  getArticleByURI(uri) {
    let result
    
    Object.values(this.state.data).forEach(cluster => {
      cluster["articles"].forEach(article => {
        // // console.log(uri, typeof(uri))
        if (article.uri === parseInt(uri)) {
          // // console.log("Found:", article.uri)
          result = article
        }
      })
    })

    return result
  }

  leaveArticleView() {
    window.scrollTo(0, 0)
    this.setState({articleToView: null})
  }

  setArticleToView(article) {
    this.setState({articleToView: article})
  }

  createFakeConcepts() {
    let concepts = {}
    for (let i=0;i<5;i++) {
      concepts[i] = [`concept ${i+1}.1`, `concept ${i+1}.2`]
    }
    return concepts
  }

  createFakeClusters(data) {
    let clusteredArticles = {}
    Object.values(data).forEach((entry, index) => {
      if (clusteredArticles[index%5]) {
        clusteredArticles[index%5].push(entry)
      } else {
        clusteredArticles[index%5] = [entry]
      }
    })
    return clusteredArticles;
  }

  getArticles(data) {
    let articles = {};
    let i = 0;
    Object.values(data).forEach(entry => {
      articles[i] = entry.articles;
      i = i + 1;
    })
    return articles;
  }

  getClusterConcepts(data) {
    let concepts = {};
    let i = 0;
    Object.values(data).forEach(entry => {
      concepts[i] = entry.concepts;
      i = i + 1;
    });
    return concepts;
  }

  getAllConcepts(data) {
    // let concepts = {};
    // let i = 0;
    // Object.values(data).forEach(entry => { 
    //   Object.values(entry.articles).forEach(article => {
    //     concepts[i] = article.conceptList;
    //     i = i + 1;
    //   });
    // });

    let concepts = [];
    let conceptSet = new Set();
    Object.values(data).forEach(entry => { 
      Object.values(entry.articles).forEach(article => {
        Object.values(article.conceptList).forEach(tag => {
          if (!conceptSet.has(tag)) {
              conceptSet.add(tag);
              concepts.push({value: tag.toLowerCase(), label: tag});
          }
        });
      });
    });
    return concepts;
  }

  getSources(data) {
    let sourceSet = new Set();
    Object.values(data).forEach(entry => {
      Object.values(entry.articles).forEach(article => {
        sourceSet.add(article.source.title);
      });
    });
    return Array.from(sourceSet);
  }

  seperateClusters(data) {
    let clusteredArticles = {};
    Object.values(data).forEach(entry => {
      if (clusteredArticles.hasOwnProperty(entry.clust)) {
        clusteredArticles[entry.clust].push(entry);
      } else {
        clusteredArticles[entry.clust] = [entry];
      }
    });
    return clusteredArticles;
  }

  getFirst(article) {
    // console.log("getFirst()")
    this.setState({article1: article});
  }

  selectSecond() {
    // console.log("selectSecond: true")
    this.setState({selectSecond: true})
  }

  getSecond(article2) {
    // console.log("getSecond()")
    let article1 = this.state.article1;
    let summaries = this.state.summaries;
    // console.log(summaries[article1["title"]]["who"]);
    // console.log(summaries[article2["title"]]["who"]);
    this.setState({article2: article2, selectSecond: false, showSummarizerModal: true});
  }

  // handleAddBookmark = (article) => {
  //   const bookmark = article;
  //
  //   var {bookmarkList} = this.state;
  //   // bookmarkElements.add(bookmark);
  //
  //   bookmarkList.set(article.title, article)
  //
  //   this.setState({bookmarkList: bookmarkList});
  // }
  //
  // handleDeleteBookmark = (title) => {
  //   var {bookmarkList} = this.state;
  //
  //   bookmarkList.delete(title);
  //
  //   this.setState({bookmarkList: bookmarkList});
  // }

  // cancelCompare() {
  //   this.setState({selectSecond: false})
  // }

  numDaysBetween(d1, d2) {
    var diff = Math.abs(d1.getTime() - d2.getTime());
    return diff / (1000 * 60 * 60 * 24);
  };

  getDate(d) {
    if (d !== "" || d !== null) {
      var date = d.split("/")
      return new Date(date[2], date[0]-1, date[1])
    }
    return new Date();
  }

  checkSource(title) {
    return this.state.filteredSources.includes(title);
  }

  checkDate(articleDate) {
    let dateDiff = this.numDaysBetween(this.getDate(articleDate), new Date());
    return dateDiff <= this.state.days;
  }

  // checkSentiment(sentimentArticle) {
  //   return 
  // }

  getLowerConcepts(articleConcepts) {
    var lower = [];
    for (var i = 0; i < articleConcepts.length; i++) {
        lower.push(articleConcepts[i].toLowerCase());
    }
    return lower;
  } 

  checkConcept(articleConcepts) {
    console.log(this.state.concept);
    let exists = true;
    Object.values(this.state.concept).forEach(concept => {
      if (articleConcepts.includes(concept) == false) {
        exists = false;
      }
    });
    return exists;
  }

  returnSentimentDec(sent, sentiment) {
    if (sent === "vnegative") {
      return sentiment <= -0.5;
    } else if (sent === "negative") {
      return sentiment > -0.5 && sentiment <= -0.1;
    } else if (sent === "neutral") {
      return sentiment > -0.1 && sentiment <= 0.1;
    } else if (sent === "positive") {
      return sentiment >= 0.1 && sentiment < 0.5;
    } else if (sent === "vpositive") {
      return sentiment >= 0.5;
    }
  }

  checkSentiment(sentiment) {
    let isValid = [];
    Object.values(this.state.sentiment).forEach(sent => {
      isValid.push(this.returnSentimentDec(sent, sentiment));
    });
    return !(isValid.every(this.checkIfFalse));
  }

  getAllFilters(article, filters) {
    let f = []
    if(filters[0] !== null) {
      f.push(this.checkSource(article.source.title));
    } 
    if(filters[1] !== null) {
      f.push(this.checkDate(article.date));
    }
    if(filters[2] !== null) {
      f.push(this.checkConcept(article.conceptList));
    }
    if(filters[3] !== null) {
      f.push(this.checkSentiment(article.sentiment));
    }

    return f.every(this.checkIfTrue);
  }

  checkIfNull(filter) {
    return filter == null;
  }

  checkIfTrue(filterResult) {
    return filterResult == true;
  }

  checkIfFalse(filterResult) {
    return filterResult == false;
  }

  applyFilterToAllArticles(data) {
    let filters = [this.state.filteredSources, this.state.days, this.state.concept, this.state.sentiment];
    if (filters.every(this.checkIfNull)) {
      return data;
    } 
    let result = JSON.parse(JSON.stringify(data));
    if (this.state.concept === null) {
      Object.values(result).forEach(entry => {
        Object.values(entry.articles).forEach(article => {
          if (this.getAllFilters(article, filters)) {
              article.filterOut = false;
            } else {
              article.filterOut = true;
            }
        });
      })
    } else {
      let clust1 = Object.values(result)[0];
      clust1.concepts = this.state.concept;
      let fitArticles = [];
      let fitTitles = new Set();
      Object.values(result).forEach(entry => {
        Object.values(entry.articles).forEach(article => {
          if (this.getAllFilters(article, filters) && !fitTitles.has(article.title)) {
              fitArticles.push(article);
              fitTitles.add(article.title)
          }
        });
      })
      clust1.articles = fitArticles;


      Object.values(result).slice(1).forEach(entry => {
        entry.concepts = []
        entry.articles = []
      })
      // Object.values(result)[0].concepts = [this.state.concept];
      // Object.values()
    }
    return result;
  }

  setSentiment(name, add) {
    if (this.state.sentiment === null) {
      this.setState({sentiment: [name]})
    } else {
      if (add) {
        let a = this.state.sentiment.concat(name);
        this.setState({sentiment: a})
      } else {
        var index = this.state.sentiment.indexOf(name);
        let a = this.state.sentiment.filter(e => e !== name)
        if (a.length === 0) {
          this.setState({sentiment: null});
        } else {
          this.setState({sentiment: a})
        }
      }
    }
  }

  setFilterSource(checkedSources) {
    if (checkedSources.length > 0) {
      this.setState({filteredSources: checkedSources});
    } else {
      this.setState({filteredSources: null})
    }
  }

  setDayFilter(day) {
    if (day > 0) {
      this.setState({days: day});
    }
  }

  setConcepts(concepts) {
    if (concepts.length > 0) {
      let conceptList = []
      Object.values(concepts).forEach(concept => {
        conceptList.push(concept.label);
      });
      this.setState({concept: conceptList});
    } else {
      this.setState({concept: null});
    }
  }

  getTags(data) {
    if (this.state.concept !== null) {
      return this.state.concept;
    } else {
      return this.state.tags;
    }
  }

  render() {
    if (!this.state.data) { 
      return null //should replace with spinner or sth
    } else {
      console.log(this.state.data)
      // const key = Object.keys(this.state.data)[this.state.clusterNum];
      const data = this.applyFilterToAllArticles(this.state.data);
      const articles = this.getArticles(data);
      const sources = this.getSources(this.state.data);
      const tags = this.getClusterConcepts(data);
      const conceptList = this.getAllConcepts(this.state.data);
      const articleViewActive = this.state.articleToView != null
      // const { bookmark, popupData, bookmarkList} = this.state;
      // const summaries = this.state.summaries;

      // const handleCompare = this.state.selectSecond ? this.getSecond : this.getFirst

      
      let articleView = <ArticleView 
        article={this.state.articleToView} 
        exitView={this.leaveArticleView}
        setView={this.setArticleToView}
        getRecs={this.getRecs}
        />

        let mainView =
          <div> 
            <FilterBar sources={sources} conceptList={conceptList} filterConcept={this.setConcepts} filterSource={this.setFilterSource} filterDate={this.setDayFilter} filterSentiment={this.setSentiment}/>
            <div id="cluster-viz-container">
              <StoryGrid data={articles} tags={tags} setArticle={this.setArticleToView}/>
            </div>
          </div>

      return (
        <div>
            <SearchAppBar 
              storyTitle={this.state.title} 
              leaveArticleView={this.leaveArticleView} 
              articleViewActive={articleViewActive}
            />
          {!this.state.articleToView ? mainView : articleView}
        </div>
      )
    }
  }
}

export default ClusterViz;
