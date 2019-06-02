import React, { Component } from 'react';
import { makeStyles, useTheme, mergeClasses } from '@material-ui/styles';
import { withStyles } from "@material-ui/core/styles";
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import IntroModal1 from '../images/introModal/IntroModal1.PNG';
import IntroModal2 from '../images/introModal/IntroModal2.PNG';
import IntroModal3 from '../images/introModal/IntroModal3.PNG';
import IntroModal4 from '../images/introModal/IntroModal4.PNG';
import IntroModal5 from '../images/introModal/IntroModal5.PNG';
import Modal from '@material-ui/core/Modal'
import classNames from 'classnames'

const tutorialSteps = [
  {
    label: 'Welcome to your one and only news media research toolkit',
    imgPath:
      IntroModal1,
    description: 'But first, here are some tips on how to get started!',
  },
  {
    // label: 'Bird',
    imgPath:
      IntroModal2,
    description: '1. Important concepts and ideas in the news articles are linked together in groups based on their correlation. You can hover over concepts to see where the clusters are.',

  },
  {
    // label: 'Bali, Indonesia',
    imgPath:
      IntroModal3,
    description: '2. Clicking on a concept in the concept graph will show all the articles that contain that concept and its neighbors',
  },
  {
    // label: 'NeONBRAND Digital Marketing, Las Vegas, United States',
    imgPath:
      IntroModal4,
    description: '3. Click on an article card to read that article and look at similar and different perspectives',
  },
  {
    // label: 'Goč, Serbia',
    imgPath:
      IntroModal5,
    description: '4. Hover over highlighted concepts to read more about them',
  },
];

const items = [
  {
    image: 'url',
    text: 'Importat'
  }
]

const styles = theme => ({
  root: {
    width:'50%',
    height: '50%',
    maxHeight:'750px',
    maxWidth:'800px',
    backgroundColor: 'white',
    alignText: 'center'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    // paddingLeft: theme.spacing.unit * 4,
    // backgroundColor: theme.palette.background.default,
  },
  img: {
    overflow: 'hidden',
    display: 'block',
    maxHeight: '75%',
    maxWidth: '100%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    verticalAlign: 'middle',
  },
  text: {
    fontWeight: 'bold',
    marginLeft: '5%',
    marginRight: '5%',
  }
});


// let [setActiveStep] = React.useState(0);

class IntroModal extends Component {
  

  constructor(props) {
    super(props)
  
  this.state = {
    open: true,
    activeStep: 0,
    setActiveStep: 0,
    maxSteps: 5,
  }

  }
  handleNext = () => {
    // this.state.setActiveStep(prevActiveStep => prevActiveStep + 1);
    let {activeStep} = this.state
    this.setState({activeStep: activeStep + 1})
  }

  handleBack = () => {
    // this.state.setActiveStep(prevActiveStep => prevActiveStep - 1);
    let {activeStep} = this.state
    this.setState({activeStep: activeStep-1})
  }

  handleClose = () => {
    this.setState({open: false})  

    console.log('closing')
  }

  render() {
    let {open, maxSteps, activeStep} = this.state
    const { classes } = this.props
    return (
      <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={this.handleClose}
      style={{
          'textAlign': 'center' 
          , 'display': 'flex'
          ,'flexDirection': 'column'
          , 'justifyContent': 'center'
          , 'alignItems': 'center'
      }}
      >
      <div className={classNames(classes.root, 'modal-responsive')}>
        <div className={classes.content}>
          {tutorialSteps[activeStep].label? (
            <Typography variant='h5' className={classes.text} color='primary'>{tutorialSteps[activeStep].label}</Typography>
          ): null}
          <img
            className={classes.img}
            src={tutorialSteps[activeStep].imgPath}
            // alt={tutorialSteps[activeStep].label}
          />
          <Typography variant="h5" className={classes.text} color="default">{tutorialSteps[activeStep].description}</Typography>  
        </div>        
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          className={classes.mobileStepper}
          nextButton={
            <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
              Next
               <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
             <KeyboardArrowLeft />
              Back
            </Button>
          }
        />
      </div>
      </Modal>
    )};
}

export default withStyles(styles)(IntroModal);