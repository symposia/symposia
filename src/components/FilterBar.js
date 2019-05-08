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
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import purple from '@material-ui/core/colors/purple';
import yellow from '@material-ui/core/colors/yellow';
import Radio from '@material-ui/core/Radio';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import Slider from '@material-ui/lab/Slider';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import CommentIcon from '@material-ui/icons/Comment';
import ConceptSelect from "./ConceptSelect";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';


const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: 'white',
    marginTop: '64px',
  },
  grow: {
    flexGrow: 0.5,
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
  container: {
  display: 'flex',
  flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 115,
  },
  slider: {
  padding: '22px 0px',
  },
  daterange: {
    width: 400,
    marginLeft: 50,
    marginRight: 50,
  },
  filter: {
    marginLeft: 20,
    marginRight: 40,
  },
  sentiment:  {
    marginLeft: 50,
    marginRight: 50,
  },
  vnegative:  {
    color: purple[900],
    '&$checked': {
      color: purple[900],
    },
  },
  negative: {
    color: red[400],
    '&$checked': {
      color: red[300],
    },
  },
  neutral:  {
    color: grey[600],
    '&$checked': {
      color: grey[500],
    },
  },
  positive: {
    color: green[400],
    '&$checked': {
      color: green[300],
    },
  },
  vpositive:  {
    color: yellow[800],
    '&$checked': {
      color: yellow[700],
    },
  },
  checked: {},
  source: {
    width: 250,
    fontSize: 12,
  },
  sourcefilter: {
    maxHeight: 400,
    overflow: 'auto',
  },
  search: {
    position: 'relative',
    width: '55%',
    marginLeft: 40,
    marginRight: 40,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#FFFFFF',
    '&:hover': {
      backgroundColor: fade('#000000', 0.10),
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
    color: '#8331FE'
  },
  inputRoot: {
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
  filterbutton: {
    color: '#8331FE',
  }
});

class FilterBar extends React.Component {
  state = {
    selectedValue: 'a',
    days: 30,
    open: false,
    range: 1,
    checked: [],
    vnegative: false,
    negative: false,
    neutral: false,
    positive: false,
    vpositive: false
  };

  //toggle for the source filters
  handleFilterToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
    this.props.filterSource(newChecked);
  };

  handleRangeChange = (event, range) => {
    this.setState({ range });
  };

  handleInputChange = prop => event => {
    console.log("hi");
    console.log(event.target.value);
    this.setState({ [prop]: event.target.value });
    this.props.filterDate(event.target.value);
  };

  handleChange = name => event => {
    console.log(name, event.target.checked);
    this.setState({ [name]: event.target.checked });
    this.props.filterSentiment(name, event.target.checked);
  };

  //Toggle for the filter button
  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ open: false });
  };

  render()  {
    const { classes } = this.props;
    const { range } = this.state;
    const { open } = this.state;
    const sources  = this.props.sources;

    return (
      <div className={classes.root}>
        <AppBar classes={{root: classes.root}} position="fixed">
          <Toolbar>
            <form className={classes.container} noValidate>
              <TextField
                id="days"
                type="number"
                inputProps={{
                  min: "1",
                  max: "30",
                  step: "1",
                }}
                defaultValue="30"
                onChange={this.handleInputChange('days')}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">Past</InputAdornment>,
                  endAdornment: <InputAdornment position="end">Days</InputAdornment>,
                }}
              />
            </form>
            <div className={classes.sentiment}>
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    checked={this.state.vnegative}
                    onChange={this.handleChange('vnegative')}
                    value="vnegative"
                    aria-label="Very Negative"
                    classes={{
                      checked: classes.checked,
                    }}
                    className={classes.vnegative}
                  />
                }
                label="Very Negative"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    checked={this.state.negative}
                    onChange={this.handleChange('negative')}
                    value="negative"
                    aria-label="Negative"
                    classes={{
                      checked: classes.checked,
                    }}
                    className={classes.negative}
                  />
                }
                label="Negative"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    checked={this.state.neutral}
                    onChange={this.handleChange('neutral')}
                    value="neutral"
                    aria-label="Neutral"
                    classes={{
                      checked: classes.checked,
                    }}
                    className={classes.neutral}
                  />
                }
                label="Neutral"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    checked={this.state.positive}
                    onChange={this.handleChange('positive')}
                    value="positive"
                    aria-label="Positive"
                    classes={{
                      checked: classes.checked,
                    }}
                    className={classes.positive}
                  />
                }
                label="Positive"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    checked={this.state.vpositive}
                    onChange={this.handleChange('vpositive')}
                    value="vpositive"
                    aria-label="Very Positive"
                    classes={{
                      checked: classes.checked,
                    }}
                    className={classes.vpositive}
                  />
                }
                label="Very Positive"
              />
            </div> */}
            <div className={classes.grow} />
            
            <ConceptSelect conceptList={this.props.conceptList} filterConcept={this.props.filterConcept}/>

            <div className={classes.grow} />
            
            {//Filter Sources button and Window
            }
            <div className={classes.filter}>
              <Button
                buttonRef={node => {
                  this.anchorEl = node;
                }}
                aria-owns={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={this.handleToggle}
                className={classes.filterbutton}
              >
                Filter Sources
              </Button>
              <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    id="menu-list-grow"
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={this.handleClose}>
                        <MenuList className={classes.sourcefilter}>
                          {sources.map(value => (
                          <MenuItem>
                            <ListItem className={classes.source} key={value} role={undefined} dense button onClick={this.handleFilterToggle(value)}>
                              <Checkbox
                                checked={this.state.checked.indexOf(value) !== -1}
                                tabIndex={-1}
                                disableRipple
                              />
                            <ListItemText inset="true" primary={value} primaryTypographyProps={{
                                noWrap: 'true'
                              }}/>
                            </ListItem>
                          </MenuItem>
                          ))}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          </Toolbar>
        </AppBar>



      </div>
    );
  }
}



export default withStyles(styles)(FilterBar);
