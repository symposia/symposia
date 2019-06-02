// import React from 'react';
// import { withStyles, useTheme } from '@material-ui/styles';
// import MobileStepper from '@material-ui/core/MobileStepper';
// import Button from '@material-ui/core/Button';
// import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
// import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
// import Modal from '@material-ui/core/Modal'
// import Paper from '@material-ui/core/Paper'
// import { Typography } from '@material-ui/core';



// const tutorialSteps = [
//     {
//       label: 'San Francisco – Oakland Bay Bridge, United States',
//       imgPath:
//         'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
//     },
//     {
//       label: 'Bird',
//       imgPath:
//         'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
//     },
//     {
//       label: 'Bali, Indonesia',
//       imgPath:
//         'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
//     },
//     {
//       label: 'NeONBRAND Digital Marketing, Las Vegas, United States',
//       imgPath:
//         'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60',
//     },
//     {
//       label: 'Goč, Serbia',
//       imgPath:
//         'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
//     },
//   ];

//   const theme = useTheme();
//   const useStyles = theme => ({
//     root: {
//       maxWidth: 400,
//       flexGrow: 1,
//     },
//     header: {
//       display: 'flex',
//       alignItems: 'center',
//       height: 50,
//       paddingLeft: theme.spacing.unit * 4,
//       backgroundColor: theme.palette.background.default,
//     },
//     img: {
//       height: 255,
//       maxWidth: 400,
//       overflow: 'hidden',
//       display: 'block',
//       width: '100%',
//     },
//   });


//   const classes = useStyles();

//   const [activeStep, setActiveStep] = React.useState(0);
//   const maxSteps = tutorialSteps.length;

// class IntroModal {
//     constructor() {
//         this.state= {
//             open: true,
//         };
//     }

//     handleClose() {
//         this.setState({open: false});
//     }

//   handleNext() {
//     setActiveStep(prevActiveStep => prevActiveStep + 1);
//   }

//   handleBack() {
//     setActiveStep(prevActiveStep => prevActiveStep - 1);
//   }
// render() {
//     return (
//         <div>
//             <Modal
//             aria-labelledby="simple-modal-title"
//             aria-describedby="simple-modal-description"
//             open={this.state.open}
//             onClose={this.handleClose}
//             style={{
//                 'textAlign': 'center' 
//                 , 'display': 'flex'
//                 ,'flexDirection': 'column'
//                 , 'justifyContent': 'center'
//                 , 'alignItems': 'center'
//             }}
//             >
//                 <div >
//                     <Paper square elevation={0}>
//                         <Typography>Current</Typography>
//                     </Paper>
//                         <Typography>1</Typography>
//                     <MobileStepper
//                     variant="dots"
//                     steps={6}
//                     position="static"
//                     activeStep={activeStep}
//                     className={classes.root}
//                     nextButton={
//                     <Button size="small" onClick={this.handleNext} disabled={activeStep === 5}>
//                     Next
//                     {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
//                     </Button>
//                     }
//                     backButton={
//                     <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
//                         {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
//                         Back
//                     </Button>
//                     }
//                     />
//                     </div>
//             </Modal>
//         </div>
//       );
    
// }
// }

// export default  withStyles(useStyles)(IntroModal);
