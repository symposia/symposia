import React from "react";
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

import "./ArticleGrid.css";

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
    maxWidth: 100,
    maxHeight: 100,
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: "cover"
  },
  filteredCard: {
    maxWidth: 100,
    maxHeight: 100,
    opacity: 0.2
  },
  content: {
    height: 100,
    wordWrap: "break-word"
    // overflow: wrap
    // overflow-wrap: break-word
  }
});

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


  filterOut(value) {
    console.log("AritcleGrid:", value.filterOut)
    return value.filterOut ? "" : " filter-out"
  }

  set_focus(typeFilterList) {
    this.props.articles.map(value => {
      if(typeFilterList.includes(value.sourceName)) {
        value["filtered"] = true;
      }
    })
    // nodeImages.style("opacity", function(o) {
    //   return typeFilterList.includes(o.sourceName) ? 1 : highlight_trans;
    // });
  }

  render() {
    const { classes } = this.props;
    const { alignItems, direction, justify } = this.state;
    return (
      <Grid
        container
        spacing={16}
        className={classes.demo+this.props.articles.length}
        alignItems={alignItems}
        direction={direction}
        justify={justify}
        // xs={12}
      >
        {this.props.articles.map((value, index) => (
          <Grid key={index} item>
            {/* <Paper
              className={classes.paper}
              // style={{ paddingTop: (value + 1) * 10, paddingBottom: (value + 1) * 10 }}
            >
              {value.sourceName}
            </Paper> */}
            <Card className={
              classes.card + this.filterOut(value)
              }>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt={value.sourceName}
                  className={styles.media}
                  height="100"
                  image={"http://logo.clearbit.com/" + getDomain(value.url)}
                  title={value.title}
                />
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default withStyles(styles)(ArticleGrid);
