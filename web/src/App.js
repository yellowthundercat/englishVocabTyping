import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Title from './components/Title'
import TypingSection from './components/TypingSection'
import FilterSection from './components/FilterSection'
import DictionSection from './components/DictionSection'

import a1ListFull from './static/word/a1-word.json'
import a2ListFull from './static/word/a2-word.json'
import b1ListFull from './static/word/b1-word.json'
import b2ListFull from './static/word/b2-word.json'
import c1ListFull from './static/word/c1-word.json'

import a1List from './static/a1-onlyWord.json'
import a2List from './static/a2-onlyWord.json'
import b1List from './static/b1-onlyWord.json'
import b2List from './static/b2-onlyWord.json'
import c1List from './static/c1-onlyWord.json'



const baseListFull = {}
a1ListFull.forEach((word) => { baseListFull[word.word] = word })
a2ListFull.forEach((word) => { baseListFull[word.word] = word })
b1ListFull.forEach((word) => { baseListFull[word.word] = word })
b2ListFull.forEach((word) => { baseListFull[word.word] = word })
c1ListFull.forEach((word) => { baseListFull[word.word] = word })
const maximumWordPerType = 200
const baseList = [a1List, a2List, b1List, b2List, c1List]

const styles = {
  root: {

  },
};

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      typingMode: 'Random Word',
      difficultLevel: 3,
      typedWord: [],
      currentWord: null,
      currentWordPosition: 0,
      currentList: [],
      typeDictionary: ''
    }
  }

  componentDidMount() {
    this.generateListWord();
  }

  getRandomWord = (start, end = null) => {
    let isAcceptDuplicate = Math.floor(Math.random() * 3)
    let newWord = 'across'
    if (end === null) {
      newWord = baseList[start][Math.floor(Math.random() * baseList[start].length)]
    } else {
      let level = Math.floor(Math.random() * (end+1))
      newWord = baseList[level][Math.floor(Math.random() * baseList[level].length)]
    }
    // check dup
    if (isAcceptDuplicate === 0) {
      if (this.state.typedWord.some((word) => word === newWord))
        return this.getRandomWord(start, end)
    }
    return newWord
  }

  generateListWord = () => {
    let newListWord = []
    for (let i=1; i<=maximumWordPerType; i++) {
      let isCurrentLevel = Math.floor(Math.random() * 2)
      let newWord = 'across'
      if (isCurrentLevel === 1) {
        newWord = this.getRandomWord(this.state.difficultLevel-1)
      } else {
        newWord = this.getRandomWord(0, this.state.difficultLevel-1)
      }
      newListWord.push(newWord)
    }
    this.setState({ currentList: newListWord, currentWordPosition: 0, currentWord: baseListFull[newListWord[0]]})
  } 

  handleChangeMode = (event) => {
    this.setState({ typingMode: event.target.value })
  }

  handleChangeDifficult = (event, value) => {
    this.setState({ difficultLevel: value })
  }

  goNextWord = (isCorrect) => {
    const { typedWord, currentWord, currentWordPosition, currentList} = this.state
    let newTypedWord = [...typedWord]
    if (isCorrect)
      newTypedWord.push(currentWord.word)
    let newWordPosition = currentWordPosition + 1
    let newWord = baseListFull[currentList[newWordPosition]]
    this.setState({ typedWord: newTypedWord, currentWord: newWord,
      currentWordPosition: newWordPosition})
  }

  handleStop = () => {

  }

  handleReload = () => {
    this.generateListWord()
  }

  playSound = () => {
    const {currentWord} = this.state
    if (currentWord && currentWord.word) {
      import(`./static/soundWebm/${currentWord.word}.webm`).then(soundModule => {
        console.log(soundModule.default)
        let audio = new Audio(soundModule.default)
        audio.play()
      })
    }
  }

  handleHotKey = (keyType) => {
    const { typingMode, typeDictionary } = this.state
    // typingMode
    if (typingMode === 'Random Word') {
      if (keyType === '1') {
        this.playSound()
      }
      if (keyType === '2') {
        if (typeDictionary !== 'English')
          this.setState({ typeDictionary: 'English' })
        else this.setState({ typeDictionary: '' })
      }
      if (keyType === '3') {
        if (typeDictionary !== 'Vietnam')
          this.setState({ typeDictionary: 'Vietnam' })
        else this.setState({ typeDictionary: '' })
      }
    }

    if (typingMode === 'Full Sentence') {
      if (keyType === '1') {
        if (typeDictionary !== 'Vietnam')
          this.setState({ typeDictionary: 'Vietnam' })
        else this.setState({ typeDictionary: '' })
      }
    }
  }

  render() {
    const { classes } = this.props
    const { typingMode, currentList, currentWord, currentWordPosition, typeDictionary } = this.state
    return (
      <div className={classes.root}>
        <Title></Title>
        <FilterSection 
          handleChangeMode={this.handleChangeMode} 
          typingMode={typingMode}
          handleChangeDifficult={this.handleChangeDifficult}/>     

        <TypingSection
          currentList={currentList}
          currentWordPosition={currentWordPosition}
          typingMode={typingMode}
          goNextWord={this.goNextWord}
          handleStop={this.handleStop}
          handleReload={this.handleReload}
          handleHotKey={this.handleHotKey}
          />
        <DictionSection 
          currentWord={currentWord} 
          typeDictionary={typeDictionary} 
          typingMode={typingMode}
          playSound={this.playSound}
        />
      </div>
    )
  }
}

export default withStyles(styles)(App);
