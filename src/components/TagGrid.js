import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Chip from '@material-ui/core/Chip';
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";


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
  constructor(props) {
    super(props);
    this.state = {
      hover: true,
      concepts: [],
    }
  }

  
  componentDidMount() {
    console.log(this.props.tags)
    let concepts = this.props.tags

    Object.values(concepts).forEach((entry, index) => {
      let wikiSearchText = concepts[index]


      fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${wikiSearchText}`)
      .then((resp) => { resp.json()
        .then((data) => {
          let currConcept = {}
          Object.assign(currConcept, {description: data.description})
          Object.assign(currConcept, {summary: data.extract_html})
          Object.assign(currConcept, {originalimage: data.originalimage})
          Object.assign(currConcept, {uri: data.content_urls.desktop.page})
          Object.assign(currConcept, {title: data.title})


          concepts[index] = currConcept
          this.setState({concepts: concepts})  
        })}) 
    })
  }

  render() {
    const { classes } = this.props;
    if(this.state.concepts.length > 0) {
      return (
        <Grid container spacing={16} className={classes.root + " tags-container"}>
          {this.state.concepts.map((value, index) => (
            // this.state.hover ? (
              <Tooltip placement="top"
                leaveTouchDelay = {1000}
                title={
                  <Typography color="inherit">
                    <p>
                      {value.originalimage? (
                        <img src={value.originalimage.source} height='20%' width='100px'></img>
                      ) : (
                        null
                      )}
                    </p>
                    <p className="popup-title">
                      {value.title}
                    </p>
                    <p>
                      <b className="popup-subtitles">{"Relevancy Score: "}</b>{value.score}
                    </p>
                    <p className="popup-description">
                      {value.description}
                    </p>
                    <p>
                      <div className="popup-summary" dangerouslySetInnerHTML={{ __html: value.summary }} />
                    </p>                    
                  </Typography>
                }
              >
              <a href={value.uri} target="_blank" rel="noopener noreferrer">
                <Grid key={index} item>
                  <Chip
                    label={value.title}
                    className={classes.paper}
                    // style={{ paddingTop: (value + 1) * 10, paddingBottom: (value + 1) * 10 }}
                    variant="outlined"
                    // onMouseLeave={()=> {this.setState({hover:!this.state.hover})}}
                  >
                  </Chip>
                </Grid>
              </a>
            </Tooltip>
            // ) : (
            //   <Grid key={index} item>
            //     <Chip
            //       label={value.title}
            //       className={classes.paper}
            //       // style={{ paddingTop: (value + 1) * 10, paddingBottom: (value + 1) * 10 }}
            //       variant="outlined"
            //       onMouseEnter={()=> {this.setState({hover:!this.state.hover})}}
            //       >
            //     </Chip>
            //   </Grid>

            // )
          ))}
        </Grid>
      );
    } else {
      return null;
    }
  }
}

export default withStyles(styles)(TagGrid);
