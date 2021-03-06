import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 88,
    marginBottom: 16,
  },
  demo: {
    height: 240
  },
  paper: {
    padding: theme.spacing.unit * 2,
    height: "100%",
    color: "#707070",
    backgroundColor: "#FFFFFF",
    fontSize: "16px"
  },
  control: {
    padding: theme.spacing.unit * 2
  }
});

class TagGrid extends React.Component {
  render() {
    console.log("Taggrid: ", this.props.tags)
    const { classes } = this.props;
    if (!this.props.tags) { return null; }
    return (
      <Grid container spacing={16} className={classes.root + " tags-container"}>
        {this.props.tags.map((value, index) => (
          <Grid key={index} item>
            <Chip
              label={value}
              className={classes.paper}
              variant="outlined"
            >
            </Chip>
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default withStyles(styles)(TagGrid);
