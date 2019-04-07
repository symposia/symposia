import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ArticleGrid from "./ArticleGrid";
import Grid from "@material-ui/core/Grid";
import TagGrid from "./TagGrid";

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
            <div id="story-grid">
                <Grid container className={classes.root}>
                    <TagGrid tags= {this.props.tags[0]} />
                    <ArticleGrid articles={this.props.data[0]} handlePopup={this.props.handlePopup} zoomLevel={this.props.zoomLevel}/>

                    <TagGrid tags= {this.props.tags[1]} />
                    <ArticleGrid articles={this.props.data[1]} handlePopup={this.props.handlePopup} zoomLevel={this.props.zoomLevel}/>

                    <TagGrid tags= {this.props.tags[2]} />
                    <ArticleGrid articles={this.props.data[2]} handlePopup={this.props.handlePopup} zoomLevel={this.props.zoomLevel}/>

                    <TagGrid tags= {this.props.tags[3]} />
                    <ArticleGrid articles={this.props.data[3]} handlePopup={this.props.handlePopup} zoomLevel={this.props.zoomLevel}/>

                    <TagGrid tags= {this.props.tags[4]} />
                    <ArticleGrid articles={this.props.data[4]} handlePopup={this.props.handlePopup} zoomLevel={this.props.zoomLevel}/>
                </Grid>
            </div>
        );
    };
}

export default withStyles(styles)(StoryGrid);
