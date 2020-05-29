import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import WordBoard from './WordBoard'
import WordInputSection from './WordInputSection'
import ResultTable from './ResultTable'

const styles = {
  root: {
  },
};

class TypingSection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      wordCount: 0, 
      keyPress: 0,
      keyRight: 0,
      totalWord: 0,
    }
  }
  
  componentDidMount() {
  }

  handleStart = () => {
    this.setState({
      wordCount: 0, 
      keyPress: 0,
      keyRight: 0,
      totalWord: 0,
    })
    this.props.handleStart()
  }

  handleTyping = (event) => {
    const { currentList, currentWordPosition } = this.props
    let newWord = event.target.value
    let lastCharater = newWord[newWord.length - 1]
    if (lastCharater >= '0' && lastCharater <= '9') {
      return
    }
    if (newWord === ' ' || newWord === '\n')
      newWord = ''
    let word = currentList[currentWordPosition]
    let newCurrentCorrect = true
    if (newWord !== word.slice(0, newWord.length)) {
      newCurrentCorrect = false
    } 
    this.props.handleUpdateTyping(newWord, newCurrentCorrect)
  }

  handleKeyTyping = (event) => {
    const { keyPress, keyRight, wordCount, totalWord } = this.state
    const { currentList, currentWordPosition, currentCorrect, typingState, } = this.props
    // space or enter
    if (event.which === 13 || event.which === 32) {
      let newKeyRight = keyRight, newWordCount = wordCount
      if (currentCorrect) {
        newWordCount += 1
        newKeyRight += currentList[currentWordPosition].length
      }
      this.setState({
        keyRight: newKeyRight,
        totalWord: totalWord + 1,
        wordCount: newWordCount,
      }, () => {
        this.props.goNextWord(currentCorrect)
      })
      return
    }

    // dictionary
    if (event.key >= '0' && event.key <= '9') {
      this.props.handleHotKey(event.key)
      return
    }

    if (typingState === 'waiting') {
      this.handleStart()
    }

    this.setState({ keyPress: keyPress+1})
  }

  handleMiddleReload = () => {
    this.props.handleStop()
    this.props.handleReload()
  }


  render() {
    const { classes, currentList, currentWordPosition, 
      firstDisplay, correctList, currentCorrect,
      currentTypingWord, typingState, countDownTime,  
    } = this.props
    const { keyPress, keyRight, wordCount, totalWord } = this.state
    if (typingState === 'ending') {
      return <ResultTable result={{keyPress, keyRight, wordCount, totalWord}}
        handleReload={this.props.handleReload}/>
    }
    return (
      <div className={classes.root}>
        <WordBoard 
          currentList={currentList}
          correctList={correctList}
          currentCorrect={currentCorrect}
          firstDisplay={firstDisplay} 
          currentWordPosition={currentWordPosition}
          goNextLine={this.props.goNextLine}
        />
        <WordInputSection 
          currentTypingWord={currentTypingWord}
          handleTyping={this.handleTyping}
          handleKeyTyping={this.handleKeyTyping}
          countDownTime={countDownTime}
          handleReload={this.handleMiddleReload}
          />
      </div>
    )
  }
}

export default withStyles(styles)(TypingSection);