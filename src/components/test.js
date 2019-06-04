import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'

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
    super(props)
    this.onPerspectiveChange = this.onPerspectiveChange.bind(this)
    this.state = {
      concepts: [],
    }
  }  

  componentDidMount() {
    let concepts = this.props.tags

    Object.values(concepts).forEach((entry, index) => {
      let currConcept = concepts[index]
      let { uri } = currConcept
      let wikiSearchText = currConcept


      fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${wikiSearchText}`)
      .then((resp) => { resp.json()
        .then((data) => {
          Object.assign(currConcept, {description: data.description})
          Object.assign(currConcept, {summary: data.extract_html})
          Object.assign(currConcept, {originalimagesrc: data.originalimage})
          
          concepts[index] = currConcept
          this.setState({concepts: concepts})  
        })}
      ) 
    })
  }

  generateConceptPopup(conceptPhrase, concept){
    const { description, label, score, summary, uri, originalimage} = concept

    // console.log(Object.keys(concept))
    
    console.log(originalimage.source)
    // console.log(summary)

    let conceptPhrasePopup = 
      <Tooltip placement="top"
          leaveTouchDelay = {1000}
          title={
            <Typography color="inherit">
              <p className="popup-title">
                {label.eng}
              </p>
              <p>
                <b className="popup-subtitles">{"Relevancy Score: "}</b>{score}
              </p>
              <p className="popup-description">
                {description}
              </p>
              <p>
              <div className="popup-summary" dangerouslySetInnerHTML={{ __html: summary }} />
              </p>
            </Typography>}>
        <a href={uri} target="_blank" rel="noopener noreferrer">{ conceptPhrase }</a>
      </Tooltip>

    return conceptPhrasePopup
  }

  render() {
    const { classes } = this.props;
    let conceptPhrase = null;
    let concept = null;
    console.log(this.props.tags)
    if(this.props.tags.length > 0) {
      
      return (
        <Grid container spacing={16} className={classes.root + " tags-container"}>
          {this.props.tags.map((value, index) => (
            conceptPhrase = 
            <Grid key={index} item>
              <Chip
                label={value}
                className={classes.paper}
                // style={{ paddingTop: (value + 1) * 10, paddingBottom: (value + 1) * 10 }}
                variant="outlined"
              >
              </Chip>
            </Grid>
          ).then((value) => {
            concept = value
          }).then(() => {
            this.generateConceptPopup(conceptPhrase, concept)
          }))}
        </Grid>
      );
    } else {
      return null;
    }
  }
}

export default withStyles(styles)(TagGrid);
