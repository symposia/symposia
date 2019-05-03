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
import ArticleView from "./ArticleView"

class ClusterViz extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      dataForArticleView: null,
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
      articleToView: null,
      recs: null
    };

    this.getFirst = this.getFirst.bind(this);
    this.getSecond = this.getSecond.bind(this);
    this.selectSecond = this.selectSecond.bind(this);

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
        fileName = "avengers-cluster.json"
        break;
      case "joe-biden-2020":
        title = "Joe Biden Announces 2020 Presidential Campaign"
        recsURL = "https://s3-us-west-2.amazonaws.com/symposia/recommendations/joe-biden-2020-rec.json"
        dataIsClustered = true
        fileName = "avengers-cluster.json"
        break;
      case "ukraine-elections":
        title = "Comedian wins Ukranian Presidential Elections"
        recsURL = "https://s3-us-west-2.amazonaws.com/symposia/recommendations/ukraine-elections-rec.json"
        dataIsClustered = true
        fileName = "avengers-cluster.json"
        break;
      default:
    }

    if (dataIsClustered) {
      const dataURL = `https://s3-us-west-2.amazonaws.com/symposia/clusters/${fileName}`
      fetch(dataURL)
        .then(resp => resp.json())
        .then(clusteredData => {
          console.log(this.formatDataForArticleView(clusteredData))
          this.setState({
            data: clusteredData,
            dataForArticleView: this.formatDataForArticleView(clusteredData),
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
      //     // console.log(clusteredArticles)
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

  formatDataForArticleView(clusteredData) {
    return Object.values(clusteredData).map(cluster => cluster.articles)
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
      // console.log(typeof(uri), uri)
      recObj["rec"].push(article)
    })
    recURIObj.non_rec.forEach(uri => {
      // console.log(uri)
      recObj["non_rec"].push(this.getArticleByURI(uri))
    })

    return recObj
  }

  getArticleByURI(uri) {
    let result
    
    Object.values(this.state.dataForArticleView).forEach(cluster => {
      // console.log(cluster)
      cluster.forEach(article => {
        if (article.uri === uri) {
          // console.log("Found:", article.uri)
          result = article
        }
      })
    })

    return result
  }

  leaveArticleView() {
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
    Object.keys(result).forEach(resultKey => {
      let cluster = result[resultKey]
      Object.keys(cluster).forEach(clusterKey => {
        let article = cluster[clusterKey]
        if (this.state.filteredSources.has(article.sourceName)) {
          article["filterOut"] = true
        } else {
          article.filterOut = false
        }
      });
    })
    return result;
  }

  //Filters out the selected sources.
  filter(data) {
    var newsSources = [];
    var exists = [];
    var filtered = false;
    var typeFilterList;
    for (let el in data) {
      var articles = data[el];
      Object.values(articles).forEach(node => {
        if (!exists.includes(node.sourceName)) {
          exists.push(node.sourceName);
          newsSources.push({ sourceName: node.sourceName, url: node.url });
        }
      })
    }

    this.setState({
      filteredSources: new Set(exists)
    })
    typeFilterList = exists;

    function stateTemplate(sourceName) {
      return (
        '<div class="list-item container__row">' +
        `<input class="cbx" id="${sourceName}"  name="${sourceName}" type="checkbox">` +
        `<label class="source-check" for="${sourceName}"><span class="slider"></span></label>` +
        `<div class="label-text">${sourceName}</div>` +
        "</div>"
      );
    }

    // Populate list with states
    newsSources.forEach(function(s) {
      document
        .getElementById("news-sources-filter-list")
        .insertAdjacentHTML("beforeend", stateTemplate(s.sourceName));
    });

    // Events
    const resetSourcesButton = document.querySelector(".reset-btn");
    resetSourcesButton.addEventListener("click", e => {
      e.stopPropagation();
      typeFilterList = exists;
      this.setState({
        filteredSources: new Set(exists)
      })

      const list = document.querySelectorAll("input[type=checkbox]");
      for (let item of list) {
        item.checked = false;
      }
      filtered = false;
    });

    const dropdownSearchInput = document.querySelector(".dropdown-search");
    dropdownSearchInput.addEventListener("input", function(e) {
      e.stopPropagation();
      var target = $(this);
      var dropdownList = target.closest(".dropdown-list");
      var search = target.val().toLowerCase();

      dropdownList.find(".list-item").each(function() {
        var text = $(this)
          .text()
          .toLowerCase();
        var match = text.indexOf(search) > -1;
        $(this).toggle(match);
      });
    });

    document
      .querySelector(".dropdown-list")
      .addEventListener("change", (e) => {
        if (e.target.type === "checkbox") {
          if (!filtered) {
            typeFilterList = [];
            filtered = true;
          }

          if (e.target.checked) {
            typeFilterList.push(d3.select(e.target).attr("name"));
            // set_focus();
          } else {
            typeFilterList.splice(typeFilterList.indexOf("foo"), 1);
            if (typeFilterList.length === 0) {
              typeFilterList = exists;
              this.setState({
                filteredSources: new Set(exists)
              })
              filtered = false;
            }
          }

          this.setState({
            filteredSources: new Set(typeFilterList)
          })
        }
        return false;
      });
  }


  

  render() {
    const data = this.state.data
    const dataForArticleView = this.state.dataForArticleView

    console.log("Original Data:", data)
    console.log("ArticleView Data:", dataForArticleView)

    if (!data || !dataForArticleView) {return null}

    const tags = this.state.tags;
    const { bookmark, popupData, bookmarkList} = this.state;
    const summaries = this.state.summaries;

    const handleCompare = this.state.selectSecond ? this.getSecond : this.getFirst

    let filterBar = <FilterBar />
    let storyGrid = <StoryGrid data={dataForArticleView} tags={tags} setArticle={this.setArticleToView}/>
    let articleView = <ArticleView 
      article={this.state.articleToView} 
      exitView={this.leaveArticleView}
      setView={this.setArticleToView}
      getRecs={this.getRecs}
      />

    let title = (
        <div id="title-container">
          <h1 id="title">{this.state.title != null ? this.state.title : "title"}</h1>
        </div>
    )

    if (!data) { return null }

    return (
      <ReactContext.Provider
      value={{
        someData:"somedata",
        bookmark: bookmark,
        bookmarkList: bookmarkList,
        handleAddBookmark: this.handleAddBookmark,
        handleDeleteBookmark: this.handleDeleteBookmark,
        handlePopup: this.handlePopup,
        handlePopupExit:this.handlePopupExit,
        popupData:popupData
      }}>

      <SearchAppBar />
      {!this.state.articleToView ? filterBar : null}
      <div id="cluster-viz-container">
        {!this.state.articleToView ? title : null}
        {!this.state.articleToView ? storyGrid : null}
        {this.state.articleToView ? articleView : null}
        {
          this.state.article1 != null && this.state.showSummarizerModal === false && this.state.selectSecond === false &&
          <Popup handlePopupExit={this.handlePopupExit} selectSecond={this.selectSecond} data={this.state.article1} />
        }
        {
            this.state.showSummarizerModal &&
            <SummarizerModal
              handleModalClose={this.handleModalClose}
              article1={this.state.article1}
              article2={this.state.article2}
              summary1={this.state.summaries[this.state.article1.title]}
              summary2={this.state.summaries[this.state.article2.title]}
            />
        }
        {
          this.state.selectSecond &&
          <div id="select-second-prompt">
            <p>
              Please Select a second article compare.
            </p>
            <button className="my-btn" onClick={this.cancelCompare}>Cancel</button>
          </div>
        }
      </div>
      <div visibility="hidden" id="filter-bookmark-container">
        <div id="filter-container" className="dropdown-list">
          <h4>Filter</h4>
          <input
            type="search"
            placeholder="Search Sources"
            className="dropdown-search"
          />
          <ul id="news-sources-filter-list" />
          <button
            className="my-btn reset-btn"
            type="text"
            placeholder=""
            aria-label="reset filters"
            aria-describedby="basic-addon1"
          >
            Reset
          </button>
        </div>
      </div>


      </ReactContext.Provider>
    );
  }
}

export default ClusterViz;
