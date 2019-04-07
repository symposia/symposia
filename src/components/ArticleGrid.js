import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
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
  cardsmall: {
    maxWidth: 40,
    maxHeight: 40
  },
  cardbig: {
    width: 300,
    height: 200,
    margin: 20
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

  articlePopUp = (event, value) => {
    console.log('clicked: ', event.target);
    const index = event.target.attributes.getNamedItem('data-index').value
    const article = this.props.articles[index]
    console.log(article)
    this.props.handlePopup(article)
  }

  set_focus(typeFilterList) {
    this.props.articles.map(value => {
      if(typeFilterList.includes(value.sourceName)) {
        value["filtered"] = true;
      }
    })
  }

  filterOut(value) {
    return value.filterOut ? "" : " filter-out"
  }

  render() {
    const { classes } = this.props;
    const { alignItems, direction, justify } = this.state;

    if (this.props.zoomLevel === 0) {
      return (
        <Grid item xs={"auto"}>
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
                <Card className={classes.cardsmall + this.filterOut(value)} onClick={this.articlePopUp}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt={value.sourceName}
                      height="40"
                      // className={classes.media}
                      image={"http://logo.clearbit.com/" + getDomain(value.url)}
                      title={value.title}
                      data-index={index}
                    />
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      );
    } else if (this.props.zoomLevel === 1) {
      return (
        <Grid item xs={"auto"}>
          <Grid
            container
            spacing={16}
            className={classes.demo+this.props.articles.length}
            alignItems={alignItems}
            direction={direction}
            justify={justify}
            xs={12}
          >
            {this.props.articles.map((value, index) => (
              <Grid key={index} item>        
                <Card className={classes.card + this.filterOut(value)} onClick={this.articlePopUp}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt={value.sourceName}
                      height="100"
                      // className={chooseOpacity(value)}
                      image={"http://logo.clearbit.com/" + getDomain(value.url)}
                      title={value.title}
                      data-index={index}
                    />
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      );
    } else if (this.props.zoomLevel === 2) { 
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
              <Grid key={index} item>
                <Card className={classes.cardbig + this.filterOut(value)} onClick={this.articlePopUp}>
                  <CardActionArea>
                    <CardContent className={classes.content}>
                      {/* <Typography gutterBottom variant="h5" component="h2" /> */}
                      <Typography gutterBottom variant="subtitle1" component="p" data-index={index}>
                        {value.title}
                      </Typography>
                    </CardContent>
                    <CardMedia
                      component="img"
                      alt={value.title}
                      height="100"
                      className={classes.media}
                      image={"http://logo.clearbit.com/" + getDomain(value.url)}
                      title={value.title}
                      data-index={index}
                    />
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      );
    }
  }
}

export default withStyles(styles)(ArticleGrid);
