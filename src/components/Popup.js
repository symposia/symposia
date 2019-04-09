import React from "react";
import { withStyles } from "@material-ui/core/styles";
import "./css/Popup.css";
import { withContext } from '../Context'
import Button from '@material-ui/core/Button';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
      marginBottom: "10",

    },
    input: {
      display: 'none',
    },
  });


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

class Popup extends React.Component {

    // state = {
    //     articleURL: null,
    // }

    // componentDidMount() {
    //     this.setState({articleURL: getDomain(this.props.data.url)});
    // }


    render() {
        // const {classes} = this.props;
        const article = this.props.data
        return (
            <div id="popup-container">
                <button className='my-btn' id='exit-popup' type='button' onClick={this.props.handlePopupExit}>X</button>
                <div className="popup-row">
                    <a target="_blank" rel="noopener noreferrer" href={article.url}>
                        <h1 id='popup-title'>{article.title}</h1>
                    </a>
                </div>
                <div className="popup-row">
                    <img id='popup-logo' src={"http://logo.clearbit.com/" + getDomain(article.url)}></img>
                    <h1 id='popup-date'>{article.date}</h1>
                    <button className='my-btn' id='compare-button' onClick={this.props.selectSecond} type='button'>Compare</button>
                    <button className='my-btn' id='bookmark-button' type='button' onClick={() => this.props.handleAddBookmark(article)}>Bookmark</button>
                    {/* Logo: <img src={getDomain(article.sourceName)}></img> */}
                </div>
                <div className="popup-row" id="popup-description">
                    <p> {article.description} </p>
                </div>
            </div>
        )
    }
}

export default withContext(Popup);
