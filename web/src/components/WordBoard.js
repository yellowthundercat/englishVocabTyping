import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import color from '../constant/color'

import Card from '@material-ui/core/Card';

const styles = theme => ({
  root: {
    margin: 'auto',
    width: 'min(800px, 95%)',
    padding: 10,
    paddingRight: 5,
    marginBottom: 10,
    fontSize: 27,
    [theme.breakpoints.down('xs')]: {
      fontSize: 20,
      padding: 5,
      paddingRight:3,
      marginBottom: 5,
    },
  },
  textWrapper: {
    width: 'min(800px, 95%)',
    height: 82,
    background: color.white,
    display: 'flex',
    flexFlow: 'row wrap',
    overflow: 'hidden',
    [theme.breakpoints.down('xs')]: {
      height: 60,
    },
  },
  correctWord: {
    color: color.green,
    padding: 4,
    height: 34,
    [theme.breakpoints.down('xs')]: {
      height: 25,
      padding: 3,
    },
  },
  uncorrectWord: {
    color: color.red,
    padding: 4,
    height: 34,
    [theme.breakpoints.down('xs')]: {
      height: 25,
      padding: 3,
    },
  },
  currentWord: {
    background: color.lightGray,
    padding: 4,
    height: 34,
    [theme.breakpoints.down('xs')]: {
      height: 25,
      padding: 3,
    },
  },
  currentUncorrectWord: {
    background: color.brightRed,
    padding: 4,
    height: 34,
    [theme.breakpoints.down('xs')]: {
      height: 25,
      padding: 3,
    },
  },
  normalWord: {
    padding: 4,
    height: 34,
    [theme.breakpoints.down('xs')]: {
      height: 25,
      padding: 3,
    },
  }
});

class WordBoard extends React.Component {
  constructor(props) {
    super(props)
    this.firstDisplayRef = React.createRef()
    this.currentWordRef = React.createRef()
  }

  componentDidUpdate(preProps) {
    if (preProps.currentWordPosition !== this.props.currentWordPosition
      && this.props.currentWordPosition !== this.props.firstDisplay) {
      let firstTop = this.firstDisplayRef.current.getBoundingClientRect().top
      let currentTop = this.currentWordRef.current.getBoundingClientRect().top
      if (firstTop + 2 < currentTop) {
        this.props.goNextLine()
      }
    }
  }

  generateListWord = () => {
    let listElement = []
    const { currentList, currentWordPosition, correctList,
      classes, currentCorrect, firstDisplay } = this.props
    for (let i=firstDisplay; i<Math.min(firstDisplay+40, currentList.length); i++) {
      //choose css
      let cssClass = classes.normalWord
      if (i === currentWordPosition) {
        if (currentCorrect) cssClass = classes.currentWord
        else cssClass = classes.currentUncorrectWord
      }
      if (i < currentWordPosition) {
        if (correctList[i]) cssClass = classes.correctWord
        else cssClass = classes.uncorrectWord
      }
      //choose element
      if (i === firstDisplay) {
        listElement.push(<span key={`wordText-${currentList[i]}-${i}`} ref={this.firstDisplayRef} className={cssClass}>{currentList[i]}</span>)
        continue
      } 
      if (i === currentWordPosition) {
        listElement.push(<span key={`wordText-${currentList[i]}-${i}`} ref={this.currentWordRef} className={cssClass}>{currentList[i]}</span>)
        continue
      }
      listElement.push(<span key={`wordText-${currentList[i]}-${i}`} className={cssClass}>{currentList[i]}</span>)
    }
    return listElement
  }

  render() {
    const { 
      classes
    } = this.props
    return (
      <Card className={classes.root}>
        <div className={classes.textWrapper}>
          {this.generateListWord()}
        </div>
      </Card>
    )
  }
}

export default withStyles(styles)(WordBoard);