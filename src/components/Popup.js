import React from "react";
import { withStyles } from "@material-ui/core/styles";
import "./css/Popup.css";
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
        const {classes} = this.props;
        const article = this.props.data
        return (
            <div id="popup-container">
                <div>
                    <button id='exit-popup' type='button' onClick={this.props.handlePopupExit}>X</button>
                    <a href={article.url}>
                        <h1 id='popup-title'>{article.title}</h1>
                    </a>
                    <Button variant="contained" className={classes.button} onClick={this.props.selectSecond}>Summarize</Button>
                    <Button variant="contained" className={classes.button}>Bookmark</Button>
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

export default withStyles(styles)(Popup);