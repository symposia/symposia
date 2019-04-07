import React, { Component } from "react";
import * as d3 from "d3";
import $ from "jquery";

import "./css/ClusterViz.css";
import ZoomSlider from "./ZoomSlider";
import StoryGrid from "./StoryGrid";
import Popup from "./Popup";

class ClusterViz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      title: "",
      article1: null,
      zoomLevel: 0,
      article2: null,
      selectSecond: false
    };

    this.getFirst = this.getFirst.bind(this);
    this.getSecond = this.getSecond.bind(this);
    this.handlePopupExit = this.handlePopupExit.bind(this);
    this.changeZoomLevelchangeZoomLevel = this.changeZoomLevel.bind(this);
    this.selectSecond = this.selectSecond.bind(this);
  }

  componentDidMount() {
    let segment_str = window.location.pathname; // return segment1/segment2/segment3/segment4
    let segment_array = segment_str.split("/");
    let last_segment = segment_array.pop();
    console.log(last_segment);
    let title;
    switch (last_segment) {
      case "huawei":
        title = "Huawei CFO Arrest";
        break;
      case "shutdown":
        title = "US Government Shutdown";
        break;
      case "venezuela":
        title = "Venezeulan Crisis";
        break;
      default:
    }
    const dataURL = `/data/articles/${last_segment}.json`;
    const tagURL = `/data/tags/${last_segment}-tags.json`;
    // const dataURL = `/data/articles/${last_segment}.json`;

    console.log(dataURL, tagURL);
    Promise.all([d3.json(dataURL), d3.json(tagURL)]).then(data => {
      this.setState({ data: this.seperateClusters(data[0]), tags: data[1], title: title });
      this.filter(this.state.data);
    });
  }

  changeZoomLevel = (event, value) => {
    this.setState({ zoomLevel: value });
    console.log(this.state.zoomLevel);
  };

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
    this.setState({article1: article});
    console.log(this.state.article1);
  }

  handlePopupExit() {
    this.setState({article1: null});
  }

  selectSecond() {
    this.setState({selectSecond: true})
  }

  getSecond(article) {
    this.setState({article2: article, selectSecond: false});
    console.log(this.state.article1, this.state.article2);
  }

  // componentDidUpdate() {
  //   this.setupVisiaulization();
  // }

  render() {
    const data = this.state.data;
    const tags = this.state.tags;
    console.log(tags, typeof(tags));
    console.log(data, typeof(data));

    if (!data) {
      return null;
    }

    if (this.state.selectSecond) {
      return (
        <div id="cluster-viz-container">
          <div id="title-container">
            <h1 id="title">{this.state.title}</h1>
            <h5>Please select second article</h5>
          </div>
          <StoryGrid data={data} tags={tags} handleClick={this.getSecond} zoomLevel={this.state.zoomLevel}/>
          {/* <div id="tooltip-container" className="second" /> */}
          <div id="filter-container" className="dropdown-list">
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
            <h4>Zoom</h4>
            <ZoomSlider sliderHandler = {this.changeZoomLevel}/>
          </div>
        </div>
      );
    } else {
      console.log("not select second");
      return (
        <div id="cluster-viz-container">
          <div id="title-container">
            <h1 id="title">{this.state.title}</h1>
          </div>
          <StoryGrid data={data} tags={tags} handleClick={this.getFirst} zoomLevel={this.state.zoomLevel}/>
          {/* <div id="tooltip-container" className="second" /> */}
          <div id="filter-container" className="dropdown-list">
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
            <h4>Zoom</h4>
            <ZoomSlider sliderHandler = {this.changeZoomLevel}/>
          </div>
          {
            this.state.article1 != null ?
            <Popup handlePopupExit={this.handlePopupExit} selectSecond={this.selectSecond} data={this.state.article1} /> :
            <div></div>
          }
        </div>
      );
    }
  }

  render2() {
    const data = this.state.data;
    const tags = this.state.tags;
    console.log(tags, typeof(tags));
    console.log(data, typeof(data));

    if (!data) {
      return null;
    }


  }

  filter(data) {
    var newsSources = [];
    var exists = [];
    var filtered = false;
    var typeFilterList;

    // function set_focus() {
    //   nodeImages.style("opacity", function(o) {
    //     return typeFilterList.includes(o.sourceName) ? 1 : highlight_trans;
    //   });
    // }

    for (let el in data) {
      var articles = data[el];
      Object.values(articles).forEach(node => {
        if (!exists.includes(node.sourceName)) {
          exists.push(node.sourceName);
          newsSources.push({ sourceName: node.sourceName, url: node.url });
        }
      })
    }

    typeFilterList = exists;
    console.log(typeFilterList);

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
      // $(":checkbox").prop("checked", false);
      const list = document.querySelectorAll("input[type=checkbox]");
      for (let item of list) {
        item.checked = false;
      }
      console.log(typeFilterList);
      filtered = false;
      // set_focus();
    });

    const dropdownSearchInput = document.querySelector(".dropdown-search");
    dropdownSearchInput.addEventListener("input", function(e) {
      e.stopPropagation();
      var target = $(this);
      var dropdownList = target.closest(".dropdown-list");
      var search = target.val().toLowerCase();

      // if (!search) {
      //   dropdownList.find(".label-text").show();
      //   return false;
      // }

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
      .addEventListener("change", function(e) {
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
              filtered = false;
            }
            // set_focus();
          }

          console.log(typeFilterList);
        }
        return false;
      });
  }
}

export default ClusterViz;
