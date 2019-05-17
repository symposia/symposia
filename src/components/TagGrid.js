import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

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
  } 

  state = {
    concepts : undefined,
  }

  componentDidMount() {
    let concepts = this.props.tags
    let newConcepts = []
    Object.values(concepts).forEach((entry, index) => {
      let currConcept = {}
      let wikiSearchText = entry


      fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${wikiSearchText}`)
      .then((resp) => { resp.json()
        .then((data) => {

          Object.assign(currConcept, {description: data.description})
          Object.assign(currConcept, {summary: data.extract_html})
          Object.assign(currConcept, {label: data.displaytitle})
          Object.assign(currConcept, {uri: data.content_urls.desktop.page})

          // console.log(data)

          // concepts[index] = currConcept
          newConcepts.push(currConcept)
          this.setState({concepts: newConcepts})  
        })
      }
      ) 
    })  
  }
  
  generateConceptPopup(concept){
    if (!concept) { return null}
    const { description, label, summary, uri} = concept

    // console.log(concept)

    // console.log(conceptPhrase)
    console.log(label)
    console.log(summary)
    console.log(uri)

    let conceptPhrasePopup = 
      <Tooltip placement="top"
          leaveTouchDelay = {1000}
          title={
            <Typography color="inherit">
              <p className="popup-title">
                {label}
              </p>
              <p className="popup-description">
                {description}
              </p>
              <p>
              <div className="popup-summary" dangerouslySetInnerHTML={{ __html: summary }} />

                {/* {summary} */}
              </p>
              
            </Typography>
          }
        >
        <a href={uri} target="_blank" rel="noopener noreferrer">{ label }</a>
      </Tooltip>

    return conceptPhrasePopup
  }

  render() {
    const { classes } = this.props;
    if(this.state.concepts) {
      return (
        <Grid container spacing={16} className={classes.root + " tags-container"}>
          {this.props.tags.map((value, index) => (
            <Grid key={index} item>
              <Chip
                label={this.generateConceptPopup(this.state.concepts[index])}
                className={classes.paper}
                // style={{ paddingTop: (value + 1) * 10, paddingBottom: (value + 1) * 10 }}
                variant="outlined"
              >
              </Chip>
            </Grid>
          ))}
        </Grid>
      );
    } else {
      return null;
    }
  }
}

export default withStyles(styles)(TagGrid);
