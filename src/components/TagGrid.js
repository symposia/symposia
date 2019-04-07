import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

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
  }
});

class TagGrid extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={12}>
        {this.props.tags.map(value => (
          <Grid key={value} item>
            <Paper
              className={classes.paper}
              // style={{ paddingTop: (value + 1) * 10, paddingBottom: (value + 1) * 10 }}
            >
              {`Tag ${value + 1}`}
            </Paper>
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default withStyles(styles)(TagGrid);