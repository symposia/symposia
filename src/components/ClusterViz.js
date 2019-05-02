import React, { Component } from "react";
import * as d3 from "d3";
import $ from "jquery";
import "./css/ClusterViz.css";
import ZoomSlider from "./ZoomSlider";
import StoryGrid from "./StoryGrid";
import Popup from "./Popup";
import Bookmark from "./Bookmark";
import { PropTypes } from 'react'
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
      days: 30,
      title: "",
      popupData: null,
      bookmarkList: new Map(),
      filteredSources: null,
      article1: null,
      article2: null,
      tags: null,
      summaries: null,
      selectSecond: false,
      showSummarizerModal: false,
    };

    this.getFirst = this.getFirst.bind(this);
    this.getSecond = this.getSecond.bind(this);
    this.selectSecond = this.selectSecond.bind(this);
    this.setFilterSource = this.setFilterSource.bind(this);
    this.setDayFilter = this.setDayFilter.bind(this);
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
    Promise.resolve(d3.json(dataURL)).then(data => {
      this.setState({data: this.getArticles(data), tags: this.getConcepts(data), sources: this.getSources(data)});
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

  applyFilterToAllArticles(data) {
    if (this.state.filteredSources == null) {
      return data;
    }
    let result = data;
    Object.values(result).forEach(entry => {
      Object.values(entry).forEach(article => {
        if (this.state.filteredSources.includes(article.source.title)) {
          article["filterOut"] = true
        } else {
          article.filterOut = false
        }
      });
    });
    console.log(result);
    return result;
  }

  setFilterSource(checkedSources) {
    this.setState({filteredSources: checkedSources});
  }

  setDayFilter(days) {
    this.setState({days: days})
    console.log(this.state.days);
  }

  render() {
    const data = this.applyFilterToAllArticles(this.state.data);
    const sources = this.state.sources;
    const tags = this.state.tags;
    const { bookmark, popupData, bookmarkList} = this.state;
    const summaries = this.state.summaries;

    const handleCompare = this.state.selectSecond ? this.getSecond : this.getFirst

    if (!data) { return null }

    return (
      <div>
        <SearchAppBar />
        <FilterBar sources={sources} filterSource={this.setFilterSource} filterDate={this.setDayFilter}/>
        <div id="cluster-viz-container">
          <div id="title-container">
            <h1 id="title">{this.state.title != null ? this.state.title : "title"}</h1>
          </div>
          <StoryGrid data={data} tags={tags} />
        </div>
      </div>
    );
  }
}

export default ClusterViz;
