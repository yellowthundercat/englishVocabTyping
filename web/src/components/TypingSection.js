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
      firstDisplay: 0,
      correctList: [],
      currentCorrect: true,
      currentTypingWord: ''
    }
  }
  
  componentDidMount() {
  }

  handleTyping = (event) => {
    console.log('change')
    const { currentList, currentWordPosition } = this.props
    let newWord = event.target.value
    let word = currentList[currentWordPosition]
    console.log(newWord)
    console.log(word)
    let newCurrentCorrect = true
    if (newWord !== word.slice(0, newWord.length)) {
      newCurrentCorrect = false
    } 
    this.setState({ currentTypingWord: event.target.value, currentCorrect: newCurrentCorrect })
  }

  handleKeyTyping = (event) => {
    console.log('key')
    const { currentList, currentWordPosition } = this.props
    // space or enter
    if (event.which === 13 || event.which === 32) {
      this.setState({currentTypingWord: ''})
      return
    }
    if (event.key >= '0' && event.key <= '9') {
      console.log('number')
      return
    }
  }

  goNextLine = () => {
    this.setState({firstDisplay: this.props.currentWordPostition})
  }

  render() {
    const { classes, typingState, currentList, currentWordPosition  } = this.props
    const { firstDisplay, correctList, currentCorrect, currentTypingWord } = this.state
    if (typingState === 'ending') {
      return <ResultTable/>
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
          handleKeyTyping={this.handleKeyTyping}/>
      </div>
    )
  }
}

export default withStyles(styles)(TypingSection);