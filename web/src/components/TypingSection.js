import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import WordBoard from './WordBoard'
import WordInputSection from './WordInputSection'
import ResultTable from './ResultTable'

const styles = {
  root: {
  },
};

const defaultCountTime = 5

class TypingSection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstDisplay: 0,
      correctList: [],
      currentCorrect: true,
      currentTypingWord: '',
      typingState: 'waiting',
      countDownTime: defaultCountTime,
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
      typingState: 'running',
      countDownTime: defaultCountTime,
      wordCount: 0, 
      keyPress: 0,
      keyRight: 0,
      totalWord: 0,
    })
    this.timer = setInterval(() => {
      let {countDownTime} = this.state
      this.setState({countDownTime: countDownTime-1})
      if (countDownTime === 1)
          this.handleStop();
    }, 1000)
  }

  handleStop = () => {
    clearInterval(this.timer)
    this.setState({typingState: 'ending'})
    this.props.handleStop()
  }

  handleReload = () => {
    console.log('reload')
  }

  handleTyping = (event) => {
    const { currentList, currentWordPosition } = this.props
    let newWord = event.target.value
    if (newWord === ' ' || newWord === '\n')
      newWord = ''
    let word = currentList[currentWordPosition]
    let newCurrentCorrect = true
    if (newWord !== word.slice(0, newWord.length)) {
      newCurrentCorrect = false
    } 
    this.setState({ currentTypingWord: newWord, currentCorrect: newCurrentCorrect })
  }

  handleKeyTyping = (event) => {
    const { correctList, currentCorrect, typingState,
      keyPress, keyRight, wordCount, totalWord } = this.state
    const { currentList, currentWordPosition } = this.props
    // space or enter
    if (event.which === 13 || event.which === 32) {
      let newKeyRight = keyRight, newWordCount = wordCount
      if (currentCorrect) {
        newWordCount += 1
        newKeyRight += currentList[currentWordPosition].length
      }
      this.setState({currentTypingWord: '',
        correctList: [...correctList, currentCorrect],
        keyRight: newKeyRight,
        totalWord: totalWord + 1,
        wordCount: newWordCount,
      }, () => {
        this.props.goNextWord(currentCorrect)
      })
      return
    }
    if (event.key >= '0' && event.key <= '9') {
      console.log('number')
      return
    }

    if (typingState === 'waiting') {
      this.handleStart()
    }

    this.setState({ keyPress: keyPress+1})
  }

  goNextLine = () => {
    this.setState({firstDisplay: this.props.currentWordPosition})
  }

  render() {
    const { classes, currentList, currentWordPosition  } = this.props
    const { firstDisplay, correctList, currentCorrect,
      currentTypingWord, typingState, countDownTime,
      keyPress, keyRight, wordCount, totalWord } = this.state
    if (typingState === 'ending') {
      return <ResultTable result={{keyPress, keyRight, wordCount, totalWord}}
        handleReload={this.handleReload}/>
    }
    return (
      <div className={classes.root}>
        <WordBoard 
          currentList={currentList}
          correctList={correctList}
          currentCorrect={currentCorrect}
          firstDisplay={firstDisplay} 
          currentWordPosition={currentWordPosition}
          goNextLine={this.goNextLine}
        />
        <WordInputSection 
          currentTypingWord={currentTypingWord}
          handleTyping={this.handleTyping}
          handleKeyTyping={this.handleKeyTyping}
          countDownTime={countDownTime}
          handleReload={this.handleReload}
          />
      </div>
    )
  }
}

export default withStyles(styles)(TypingSection);