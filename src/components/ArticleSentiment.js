import React, { Component } from "react";
import Lens from '@material-ui/icons/Lens';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';

function ArticleSentiment(props) {
  let value = parseFloat(props.value)
  let color = grey[600];
  let label = "Neutral"
  // [-1,-.6] [-.6,-.2] [-.2,.2] [.2,.6] [.6,1]
  if (-1 <= value && value <= -.5) {
    color = red[900];
    label = "Very Negative"
  } else if (-.5 <= value && value <= -.1) {
    color = red[400];
    label = "Negative"
  } else if (-.1 <= value && value <= .1) {
    color = grey[600];
    label = "Neutral"
  } else if (.1 <= value && value <= .5) {
    color = green[600];
    label = "Positive"
  } else if (.5 <= value && value <= 1) {
    color = green[900];
    label = "Very Positive"
  }

  return (
    <div className="sentiment">
    <Lens style={{
      margin: 8,
      color: color
    }} />
      {label} 
  </div>
  )
}

export default ArticleSentiment;