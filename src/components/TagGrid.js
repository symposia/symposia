import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 16,
    marginBottom: 16,

  },
  demo: {
    height: 240
  },
  paper: {
    padding: theme.spacing.unit * 2,
    height: "100%",
    color:  "white",
    backgroundColor: "#6c5ce7"
  },
  control: {
    padding: theme.spacing.unit * 2
  }
});

class TagGrid extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={16} className={classes.root}>
        {this.props.tags.map(value => (
          <Grid key={value} item>
            <Paper
              className={classes.paper}
              // style={{ paddingTop: (value + 1) * 10, paddingBottom: (value + 1) * 10 }}
            >
              {value}
            </Paper>
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default withStyles(styles)(TagGrid);
