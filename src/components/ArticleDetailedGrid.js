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
    maxWidth: 300,
    maxHeight: 200
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: "cover"
  },
  content: {
    height: 100,
    wordWrap: "break-word"
    // overflow: wrap
    // overflow-wrap: break-word
  }
});

class ArticleDetailedGrid extends React.Component {
  state = {
    direction: "row",
    justify: "flex-start",
    alignItems: "flex-start"
  };

  render() {
    const { classes } = this.props;
    const { alignItems, direction, justify } = this.state;
    return (
      <Grid
        container
        spacing={16}
        className={classes.demo}
        alignItems={alignItems}
        direction={direction}
        justify={justify}
      >
        {this.props.articles.map(value => (
          <Grid key={value} item>
            <Card className={classes.card}>
              <CardActionArea>
                <CardContent className={classes.content}>
                  {/* <Typography gutterBottom variant="h5" component="h2" /> */}
                  <Typography gutterBottom variant="subtitle1" component="p">
                    {value.title}
                  </Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  className={classes.media}
                  height="100"
                  image={value.img}
                  title="Contemplative Reptile"
                />
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default withStyles(styles)(ArticleDetailedGrid);
