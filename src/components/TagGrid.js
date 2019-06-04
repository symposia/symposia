import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Chip from '@material-ui/core/Chip';
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

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
      tags: []
    }
  }

  // componentWillMount() {
  //   let { tags } = this.props
  //   if (!tags === this.state.tags) {
  //     console.log("setting concepts")
  //     this.setState({tags: tags})
  //     this.setConcepts(tags)
  //   } else {
  //     console.log("not setting concepts")
  //   }
  // }

  componentDidUpdate() {
    let { tags } = this.props
    let equal = arraysEqual(tags, this.state.tags)

    console.log(tags, this.state.tags, !equal)

    if (!equal) {
      console.log("setting concepts")
      this.setState({tags: tags})
      this.setConcepts(tags)
    } else {
      console.log("not setting concepts")
    }
  }
  
  setConcepts(concepts) {
    Object.values(concepts).forEach((entry, index) => {
      let wikiSearchText = concepts[index]
      fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${wikiSearchText}`)
      .then((resp) => { resp.json()
        .then((data) => {
          console.log(data)
          let currConcept = {}
          Object.assign(currConcept, {description: data.description})
          Object.assign(currConcept, {summary: data.extract_html})
          Object.assign(currConcept, {originalimage: data.originalimage})
          Object.assign(currConcept, {title: data.title})
          // Object.assign(currConcept, {uri: data.content_urls.desktop.page})


          console.log(currConcept)
          concepts[index] = currConcept
          this.setState({concepts: concepts})  
        })}) 
    })
  }

  render() {
    // console.log("Taggrid: ", this.props.tags)
    const { classes } = this.props;
    if (!this.state.concepts || this.state.concepts.length != this.state.tags.length) { return null;}
      return (
        <Grid container spacing={16} className={classes.root + " tags-container"}>
          {this.state.concepts.map((value, index) => (
            // this.state.hover ? (
              <Tooltip key={index} placement="top"
                leaveTouchDelay = {1000}
                title={
                  // <Typography color="inherit">
                  <div>
                    <div>
                      {value.originalimage? (
                        <img src={value.originalimage.source} height='20%' width='100px'></img>
                      ) : (
                        null
                      )}
                    </div>
                    <p className="popup-title">
                      {value.title}
                    </p>
                    <p>
                      <b className="popup-subtitles">{"Relevancy Score: "}</b>{value.score}
                    </p>
                    <p className="popup-description">
                      {value.description}
                    </p>
                    <div className="popup-summary" dangerouslySetInnerHTML={{ __html: value.summary }} />
                  </div>
                  // </Typography>
                }
              >
              <a href={value.uri} target="_blank" rel="noopener noreferrer">
                <Grid key={index} item>
                  <Chip
                    label={value.title}
                    className={classes.paper}
                    variant="outlined"
                  >
                  </Chip>
                </Grid>
              </a>
            </Tooltip>
          ))}
        </Grid>
      );
  }
}

export default withStyles(styles)(TagGrid);
