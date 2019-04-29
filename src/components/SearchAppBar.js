import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';
import Radio from '@material-ui/core/Radio';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: '#8331FE',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

class SearchAppBar extends React.Component {
  state = {
    selectedValue: 'a',
  };

  handleChange = event => {
    this.setState({ selectedValue: event.target.value });
  };

  render()  {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar classes={{root: classes.root}} position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              Symposia
            </Typography>
            <div className={classes.grow} />
              <div>
                <Radio
                  checked={this.state.selectedValue === 'a'}
                  onChange={this.handleChange}
                  value="a"
                  name="radio-button-demo"
                  aria-label="A"
                />
                <Radio
                  checked={this.state.selectedValue === 'b'}
                  onChange={this.handleChange}
                  value="b"
                  name="radio-button-demo"
                  aria-label="B"
                />
                <Radio
                  checked={this.state.selectedValue === 'c'}
                  onChange={this.handleChange}
                  value="c"
                  name="radio-button-demo"
                  aria-label="C"
                  classes={{
                    checked: classes.checked
                  }}
                />
                <Radio
                  checked={this.state.selectedValue === 'd'}
                  onChange={this.handleChange}
                  value="d"
                  color="default"
                  name="radio-button-demo"
                  aria-label="D"
                />
                <Radio
                  checked={this.state.selectedValue === 'e'}
                  onChange={this.handleChange}
                  value="e"
                  color="default"
                  name="radio-button-demo"
                  aria-label="E"
                  icon={<RadioButtonUncheckedIcon fontSize="small" />}
                  checkedIcon={<RadioButtonCheckedIcon fontSize="small" />}
                />
              </div>
            <Button color="inherit">Filter Sources</Button>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}



export default withStyles(styles)(SearchAppBar);
