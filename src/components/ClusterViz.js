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

class ClusterViz extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      sources: null,
      days: null,
      title: "",
      concept: null,
      bookmarkList: new Map(),
      filteredSources: null,
      tags: null,
      clusterNum: 0
    };

    this.getFirst = this.getFirst.bind(this);
    this.getSecond = this.getSecond.bind(this);
    this.selectSecond = this.selectSecond.bind(this);
    this.setFilterSource = this.setFilterSource.bind(this);
    this.setDayFilter = this.setDayFilter.bind(this);
    this.setConcept = this.setConcept.bind(this);
  }

  componentDidMount() {
    // let segment_str = window.location.pathname; // return segment1/segment2/segment3/segment4
    // let segment_array = segment_str.split("/");
    // let last_segment = segment_array.pop();
    // let title;

    // //handling click actions on homepage of articles
    // switch (last_segment) {
    //   case "huawei":
    //     title = "Huawei CFO Arrest";
    //     break;
    //   case "shutdown":
    //     title = "US Government Shutdown";
    //     break;
    //   case "venezuela":
    //     title = "Venezeulan Crisis";
    //     break;
    //   default:
    // }
    // const dataURL = `/data/articles/${last_segment}.json`;
    // const tagURL = `/data/tags/${last_segment}-tags.json`;
    // const summaryURL = `/data/summaries/${last_segment}-summary.json`;

    // Promise.all([d3.json(dataURL), d3.json(tagURL), d3.json(summaryURL)]).then(data => {
    //   this.setState({ data: this.seperateClusters(data[0]), tags: data[1], summaries: data[2],  title: title });
    //   this.filter(this.state.data);
    // });

    let title = "Sri Lanka Terrorist Attacks";
    let last_segment = "sri-lanka";
    const dataURL = `/data/ER-articles/${last_segment}-cluster.json`;
    Promise.resolve(d3.json(dataURL)).then(d => {
      this.setState({data: d});
    })
    //console.log(this.seperateClusters(data))
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

  getConcepts(data) {
    let concepts = {};
    let i = 0;
    Object.values(data).forEach(entry => {
      concepts[i] = entry.concepts;
      i = i + 1;
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
    console.log("getFirst()")
    this.setState({article1: article});
  }

  selectSecond() {
    console.log("selectSecond: true")
    this.setState({selectSecond: true})
  }

  getSecond(article2) {
    console.log("getSecond()")
    let article1 = this.state.article1;
    let summaries = this.state.summaries;
    console.log(summaries[article1["title"]]["who"]);
    console.log(summaries[article2["title"]]["who"]);
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
    return articleConcepts.includes(this.state.concept)
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
      f.push(this.checkConcept(this.getLowerConcepts(article.conceptList)));
    }
    return f.every(this.checkIfTrue);
  }

  checkIfNull(filter) {
    return filter == null;
  }

  checkIfTrue(filterResult) {
    return filterResult == true;
  }

  applyFilterToAllArticles(data) {
    console.log(this.state.concept);
    console.log(data);
    let filters = [this.state.filteredSources, this.state.days, this.state.concept];
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
      clust1.concepts = [this.state.concept];
      let fitArticles = [];
      Object.values(result).forEach(entry => {
        Object.values(entry.articles).forEach(article => {
          if (this.getAllFilters(article, filters)) {
              fitArticles.push(article);
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
    console.log(result);
    return result;
    
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

  setConcept(concept) {
    this.setState({concept: concept});
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
      const key = Object.keys(this.state.data)[this.state.clusterNum];
      const data = this.applyFilterToAllArticles(this.state.data);
      const articles = this.getArticles(data);
      const sources = this.getSources(this.state.data);
      const tags = this.getConcepts(data);
      console.log(tags);
      const { bookmark, popupData, bookmarkList} = this.state;
      const summaries = this.state.summaries;

      const handleCompare = this.state.selectSecond ? this.getSecond : this.getFirst

      return (
        <div>
          <SearchAppBar />
          <FilterBar sources={sources} tags={tags} filterConcept={this.setConcept} filterSource={this.setFilterSource} filterDate={this.setDayFilter}/>
          <div id="cluster-viz-container">
            <div id="title-container">
              <h1 id="title">{this.state.title != null ? this.state.title : "title"}</h1>
            </div>
            <StoryGrid data={articles} tags={tags} />
          </div>
        </div>
      );
  }

    
  }
}

export default ClusterViz;
