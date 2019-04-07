import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/lab/Slider";

const styles = {
  root: {
    width: 300
  },
  slider: {
    padding: "22px 0px"
  }
};

class ZoomSlider extends React.Component {
    state = {
        value: 0
    };

    handleChange = (event, value) => {
        this.setState({ value });
        this.props.sliderHandler(event, value);
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
        <div className={classes.root}>
            <Slider
            classes={{ container: classes.slider }}
            value={value}
            min={0}
            max={2}
            step={1}
            onChange={this.handleChange}
            />
        </div>
        );
    }
}

ZoomSlider.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ZoomSlider);