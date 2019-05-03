import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import "./css/ArticleView.css";


const styles = {
  root: {
    width: 500,
  },
};

function PositionedTooltips(props) {
  // const { article } = this.props;
  // const { concepts } = article;
  const { classes } = props;
  
  return (
    <div className={classes.root}>
      <Grid container justify="center">
        <Grid item>
          <Tooltip placement="top"
              title={
                <React.Fragment>
                  <Typography color="inherit">Tooltip with HTML</Typography>
                  <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
                  {"It's very engaging. Right?"}
                </React.Fragment>
              }
            >
            <Button>top</Button>
          </Tooltip>
        </Grid>
      </Grid>
    </div>
  );
}

PositionedTooltips.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PositionedTooltips);

