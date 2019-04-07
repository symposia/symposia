import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ArticleGrid from "./ArticleGrid";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
    root: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column"
    }
  });
  

class StoryGrid extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Grid container className={classes.root}>
                    <h2>Cluster 1</h2>
                    <ArticleGrid articles={this.props.data[0]} zoomLevel={this.props.zoomLevel}/>
                    <h2>Cluster 2</h2>
                    <ArticleGrid articles={this.props.data[1]} zoomLevel={this.props.zoomLevel}/>
                    <h2>Cluster 3</h2>
                    <ArticleGrid articles={this.props.data[2]} zoomLevel={this.props.zoomLevel}/>
                    <h2>Cluster 4</h2>
                    <ArticleGrid articles={this.props.data[3]} zoomLevel={this.props.zoomLevel}/>
                    <h2>Cluster 5</h2>
                    <ArticleGrid articles={this.props.data[4]} zoomLevel={this.props.zoomLevel}/>
                </Grid>
            </div>
        );
    };
}

export default withStyles(styles)(StoryGrid);
