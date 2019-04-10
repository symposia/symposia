import React from "react";
import {withContext} from '../Context';
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from "@material-ui/icons/Close";
import Fab from '@material-ui/core/Fab';


import "./Bookmark.css";

const styles = theme => ({
    root: {
      flexGrow: 1
    },
    actions: {
        display: 'flex',
        padding:0,
        marginTop:0,
    },
    demo: {
      height: 240,
      width: 500
    },
    paper: {
      padding: theme.spacing.unit * 2,
      height: "100%",
      color: theme.palette.text.secondary
    },
    control: {
      padding: theme.spacing.unit * 2
    },
    card: {
      width: "100%",
      height: "100%",
      display: 'flex',
    },
    media: {
      // ⚠️ object-fit is not supported by IE 11.
      objectFit: "cover",
      width: '30%'
    },
    filteredmedia: {
      objectFit: "cover",
      opacity: 0.2
    },
    content: {
      height: 100,
      wordWrap: "break-word",
    },
    cover: {
        width: 'auto',
    },
    // CloseIcon: {
    //     position:'relative',
    //     padding: 0,
    //     display: 'flex',
    //     margin: 0,
    // }
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

class Bookmark extends React.Component {

    // constructor(props) {
    //     super(props);
    //     this.state= {
    //         bookmark: {title:""},
    //     }
    // }

    state = {
        direction: "row",
        justify: "flex-start",
        alignItems: "flex-start",
    }

    handleClick(article) {
      this.props.handlePopup(article);
      this.props.handleCompare(article)
    }


    render() {
        const {bookmarkList, classes} = this.props;
        const { alignItems, direction, justify } = this.state;

        return (

            <Grid id="bookmark-container"
                container
                spacing={16}
                // className={classes.demo+this.props.articles.length}
                alignItems={alignItems}
                direction={direction}
                justify={justify}
                // xs={12}
            >
                {/* <Typography className='bookmark-heading' component="p" variant="p">Bookmarks</Typography> */}
                {Array.from(bookmarkList.values()).map((value, index) => (
                    <Grid className="bookmark-card" key={value.title} item onClick={()=>this.handleClick(value)}>
                        <Card className={classes.card}>
                            {/* <div className={classes.details}> */}
                            <CardActionArea>
                                <CardMedia
                                component="img"
                                alt={value.sourceName}
                                className={classes.cover}

                                height="100"
                                image={"http://logo.clearbit.com/" + getDomain(value.url)}
                                title={value.title}
                                data-index={index}
                                />
                            </CardActionArea>
                            <CardContent className={classes.content}>
                                <Typography component="p" variant="body1" style={{color: 'black', WebkitBoxOrient: "vertical"}} className="bookmark-title">
                                        {value.title}
                                </Typography>
                            </CardContent>
                            <CardActions className={classes.actions} disableActionSpacing>
                                <IconButton className='close-button' aria-label="Add to favorites" onClick={()=>this.props.handleDeleteBookmark(value.title)}>
                                    <CloseIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                    ))}
                </Grid>
        );
  }
}


export default withStyles(styles)(withContext(Bookmark));
