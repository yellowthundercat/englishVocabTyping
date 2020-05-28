import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'

import color from '../constant/color'

const styles = {
  root: {
  },
  wrapper: {
    width: 320,
    margin: 'auto',
  },
  reloadButton: {
    // flexGrow: 1,
    fontSize: 18,
    padding: '5px 10px',
    margin: 5
  },
  resultTitle: {
    fontSize: 32,
    textAlign: 'center',
    fontFamily: "Times New Roman",
    margin: 10,
    marginBottom: 15,
    fontWeight: 500,
  },
  wpm: {
    fontSize: 25,
    color: color.green,
    padding: 5,
    fontWeight: 500,
  },
  resultElementWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 23,
    padding: 5,
  },
  normalText: {

  }, 
  greenText: {
    color: color.green,
    fontWeight: 500,
  },
  redText: {
    color: color.red,
    fontWeight: 500,
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 0,
    paddingTop: 0,
  },
};

class ResultTable extends React.Component {
  render() {
    const { classes, result, handleReload } = this.props
    const { keyPress, keyRight, wordCount, totalWord } = result
    return (
      <div className={classes.root}>
        <Card className={classes.wrapper}>
          <CardContent>
            <div className={classes.resultTitle}>Congratulations!</div>
            <div className={classes.wpm}>{Math.floor(keyRight / 5) + " WPM"}</div>
            <div className={classes.resultElementWrapper}>
              <span className={classes.normalText}>Keystrokes:</span>
              <span className={classes.normalText}>{keyPress}</span>
            </div>
            <div className={classes.resultElementWrapper}>
              <span className={classes.normalText}>Accuracy:</span>
              <span className={classes.normalText}>{Math.round((keyRight * 10000) / keyPress) / 100 + "%"}</span>
            </div>
            <div className={classes.resultElementWrapper}>
              <span className={classes.normalText}>Correct words:</span>
              <span className={classes.greenText}>{wordCount}</span>
            </div>
            <div className={classes.resultElementWrapper}>
              <span className={classes.normalText}>Wrong words:</span>
              <span className={classes.redText}>{totalWord}</span>
            </div>
          </CardContent>
          <CardActions className={classes.buttonWrapper}>
            <Button variant="contained" className={classes.reloadButton}
              onClick={handleReload} tabindex="-1">
              Reload
            </Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}

export default withStyles(styles)(ResultTable);