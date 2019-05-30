import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
    color: "#6c5ce7",
  },
  progressContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh"
  },
});

function CircularIndeterminate(props) {
  const { classes } = props;
  return (
    <div className={classes.progressContainer}>
      <CircularProgress disableShrink className={classes.progress} size={80} thickness={3.6}/>
    </div>
  );
}

CircularIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CircularIndeterminate);
