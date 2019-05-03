import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import "./css/ArticleGrid.css";
import Image from '../images/sri-lanka-mourns-014.jpg';
import {theme} from '../App.js';

let u = Image;

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  demo: {
    height: 240
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
    width: 400,
    height: 300,
    margin: 24,
    alignItems: '',
    backgroundSize: 'cover',
    position: 'relative'
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: "scale-down",
    height: 75,
    width: 75,
    marginLeft: 108,
    backgroundColor: 'white',
    marginRight: 24
  },
  filteredCard: {
    maxWidth: 100,
    maxHeight: 100,
    opacity: 0.2
  },
  content: {
    height: "100%",
    wordWrap: "break-word",
    backgroundColor: 'rgb(0, 0, 0, 0.5)'
  },
  cardtitle: {
    color: 'white',
    fontSize: '16px'
  },
  metadata:  {
    fontSize: '12px',
    display: 'flex',
    color: 'white'
  },
  details:  {
    display: 'flex',
    position: 'absolute',
    bottom: '24px',
    left: '24px'
  }
});

//Retrieves the URL of the article and returns the result.
function getDomain(url) {
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


class ArticleGrid extends React.Component {
  state = {
    direction: "row",
    justify: "flex-start",
    alignItems: "flex-start",
  };

  set_focus(typeFilterList) {
    this.props.articles.map(value => {
      if(typeFilterList.includes(value.sourceName)) {
        value["filtered"] = true;
      }
    })
  }

  filterOut(value) {
    return value.filterOut ? "filter-out" : ""
  }

  render() {
    const { classes } = this.props;
    const { alignItems, direction, justify } = this.state;
    if (this.props.articles.length > 0) {
      return (
          <Grid item xs={"auto"}>
            <Grid
              container
              spacing={16}
              className={classes.demo+this.props.articles.length}
              alignItems={alignItems}
              direction={direction}
              justify={justify}
            >
              {this.props.articles.map((value, index) => (
                <Grid key={index} item className={this.filterOut(value)}>
                  <Card style={{backgroundImage: `url(${value.image})`}} className={classes.card} onClick={() => console.log("go to article page")}>
                      <CardContent  className={classes.content}>
                        {/* <Typography gutterBottom variant="h5" component="h2" /> */}
                        <Typography className={classes.cardtitle} gutterBottom variant="subtitle2" component="p" >
                          {value.title}
                        </Typography>
                        <div className={classes.details}>
                          <Typography className={classes.metadata} gutterBottom variant="subtitle2" component="p" >
                            {value.date}
                            {value.sentiment}
                          </Typography>
                          <CardMedia
                              component="img"
                              alt={value.title}
                              className={classes.media}
                              image={"http://logo.clearbit.com/" + getDomain(value.url)}
                              title={value.title}
                              data-index={index}
                          />
                        </div>
                      </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        );
    } else {
      return null;
    }
  }
}

export default withStyles(styles)(ArticleGrid);
