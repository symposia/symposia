import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ArticleGrid from "./ArticleGrid";
import Grid from "@material-ui/core/Grid";
import TagGrid from "./TagGrid";

const styles = theme => ({
    root: {
      flexGrow: 1,
      display: "flex",
      flexWrap: "nowrap",
      flexDirection: "column"
    },
    storyGrid: {
        padding: "20px"
    }
  });


class StoryGrid extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div id="story-grid" className={classes.storyGrid}>
                <Grid container className={classes.root}>
                    {[0,1,2,3,4].map(index => { 
                        return (
                            <div key={index}>
                                <TagGrid tags= {this.props.tags[index]} /> 
                                <ArticleGrid articles={this.props.data[index]} setArticle={this.props.setArticle} handlePopup={this.props.handlePopup} />
                            </div>
                        )
                    })}
                </Grid>
                <hr></hr>
            </div>
        );
    };
}

export default withStyles(styles)(StoryGrid);
