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



const baseListFull = a1ListFull.concat(a2ListFull).concat(b1ListFull).concat(b2ListFull).concat(c1ListFull)
const maximumWordPerType = 200
const baseList = [a1List, a2List, b1List, b2List, c1List]

const styles = {
  root: {

  },
  optionWrapper: {
    width: 500,
  },
  optionHeader: {
    width: 200,
  },
  optionBody: {
  }
};

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      typingMode: 'Random Word',
      difficultLevel: 3,
      typedWord: [],
      currentWord: null,
      currentList: [],
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
    console.log(newListWord)
    this.setState({ currentList: newListWord, currentWord: 0})
  } 

  handleChangeMode = (event) => {
    this.setState({ typingMode: event.target.value })
  }

  handleChangeDifficult = (event, value) => {
    this.setState({ difficultLevel: value })
  }

  render() {
    const { classes } = this.props
    const { typingMode } = this.state
    return (
      <div className={classes.root}>
        <Title></Title>
          <FilterSection 
          handleChangeMode={this.handleChangeMode} 
          typingMode={typingMode}
          handleChangeDifficult={this.handleChangeDifficult}/>     

        <TypingSection></TypingSection>
        <DictionSection></DictionSection>
      </div>
    )
  }
}

export default withStyles(styles)(App);
