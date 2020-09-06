import React from 'react';

import WordBoard from './WordBoard'
import WordInputSection from './WordInputSection'
import ResultTable from './ResultTable'


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

  handleStart = () => {
    this.setState({
      wordCount: 0, 
      keyPress: 1,
      keyRight: 0,
      totalWord: 0,
    })
    this.props.handleStart()
  }

  handleTyping = (event) => {
    const { currentList, currentWordPosition, currentCorrect } = this.props
    const { keyRight, wordCount, totalWord } = this.state
    let newWord = event.target.value
    let lastCharater = newWord[newWord.length - 1]
    for (const element of newWord) {
      if (element >= '0' && element <= '9') {
        this.props.handleHotKey(element)
        return
      }
    };
    // next word
    if (lastCharater === ' '){
      let newKeyRight = keyRight, newWordCount = wordCount
      if (currentCorrect) {
        newWordCount += 1
        newKeyRight += currentList[currentWordPosition].length + 1
      }
      this.setState({
        keyRight: newKeyRight,
        totalWord: totalWord + 1,
        wordCount: newWordCount,
      })
      this.props.goNextWord(currentCorrect)
      return
    }

    let word = currentList[currentWordPosition]
    let newCurrentCorrect = true
    if (newWord !== word.slice(0, newWord.length)) {
      newCurrentCorrect = false
    } 
    this.props.handleUpdateTyping(newWord, newCurrentCorrect)
  }

  handleKeyTyping = (event) => {
    const { keyPress } = this.state
    const { typingState } = this.props
    // dictionary
    if (event.key >= '0' && event.key <= '9') {
      return
    }
    if (typingState === 'waiting') {
      this.handleStart()
      return 
    }

    this.setState({ keyPress: keyPress+1})
  }

  render() {
    const { currentList, currentWordPosition, timeMode,
      firstDisplay, correctList, currentCorrect,
      currentTypingWord, typingState, countDownTime,  
    } = this.props
    const { keyPress, keyRight, wordCount, totalWord } = this.state
    if (typingState === 'ending') {
      return <ResultTable result={{keyPress, keyRight, wordCount, totalWord}}
        handleReload={this.props.handleReload}/>
    }
    return (
      <div>
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
          handleReload={this.props.handleReload}
          timeMode={timeMode}
          />
      </div>
    )
  }
}

export default TypingSection;