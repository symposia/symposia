import React from "react";
import "./Popup.css";
import { withContext } from '../Context'
function getDomain(url) {
    if (url == null) {
        return '';
    }

    var result;
    var match;

    // console.log(url);

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


    // console.log(typeof(url));
}

class Popup extends React.Component {

    // state = {
    //     articleURL: null,
    // }

    // componentDidMount() {
    //     this.setState({articleURL: getDomain(this.props.data.url)});
    // }


    render() {
        const article = this.props.popupData
        return (
            <div id="popup-container">
                <div>
                <button id='exit-popup' type='button' onClick={this.props.handlePopupExit}>X</button>
                    <button className='popup-buttons' id='compare-button' type='button'>Compare</button>
                    <button className='popup-buttons' id='bookmark-button' type='button' onClick={() => this.props.handleBookmark(article)}>Bookmark</button>
                    
                </div>
                <div>
                    <a href={article.url}>
                        <h1 id='popup-title'>{article.title}</h1>
                    </a>
                </div>
                <div>
                    <img id='popup-logo' src={"http://logo.clearbit.com/" + getDomain(article.url)}></img>

                    <h1 id='popup-date'>{article.date}</h1>

                    {/* Logo: <img src={getDomain(article.sourceName)}></img> */}
                </div>
                <div>
                    <h3> {article.description} </h3>
                </div>
            </div>
        )
    }
}

export default withContext(Popup);