import React from 'react';
import Dexie from 'dexie';

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

import convertObjectToArray from './helper/helper'

const db = new Dexie("SoundDatabase");
db.version(1).stores({
  sounds: "word"
});

const audioPoolStack = [new Audio()]

const baseListFull = {}
a1ListFull.forEach((word) => { baseListFull[word.word] = word })
a2ListFull.forEach((word) => { baseListFull[word.word] = word })
b1ListFull.forEach((word) => { baseListFull[word.word] = word })
b2ListFull.forEach((word) => { baseListFull[word.word] = word })
c1ListFull.forEach((word) => { baseListFull[word.word] = word })

const maximumWordPerType = 300
const baseList = [a1List, a2List, b1List, b2List, c1List]

const defaultCountTime = 60
const defaultNumberSetSentence = 99

var baseSentenceList = []


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
      typeDictionary: '',
      firstDisplay: 0,
      correctList: [],
      currentCorrect: true,
      currentTypingWord: '',
      typingState: 'waiting',
      countDownTime: defaultCountTime,
      soundMode: 'Auto On',
      timeMode: 'Unlimited',
    }
  }

  componentDidMount() {
    this.generateListWord();
  }

  getRandomWord = (start, end = null) => { // end = null means end = start -> current difficult level
    // let isAcceptDuplicate = Math.floor(Math.random() * 3)
    let isAcceptDuplicate = 1
    let newWord = 'across'
    if (end === null) {
      newWord = baseList[start][Math.floor(Math.random() * baseList[start].length)]
    } else {
      let level = Math.floor(Math.random() * (end + 1))
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
    for (let i = 1; i <= maximumWordPerType; i++) {
      let isCurrentLevel = Math.floor(Math.random() * 3)
      let newWord = 'across'
      if (isCurrentLevel !== 0) {
        newWord = this.getRandomWord(this.state.difficultLevel - 1)
      } else {
        newWord = this.getRandomWord(0, this.state.difficultLevel - 1)
      }
      newListWord.push(newWord)
    }
    this.setState({ currentList: newListWord, currentWordPosition: 0, currentWord: baseListFull[newListWord[0]] })
    this.preLoadSound(0)
  }

  getRandomSentence = (sentenceList, usedPosition) => {
    let sentencePosition = Math.floor(Math.random() * (sentenceList.length-2))
    if (usedPosition[sentencePosition] === true)
      return this.getRandomSentence(sentenceList, usedPosition)
    return sentencePosition
  }

  generateListSentence = () => {
    let sentenceSet = Math.floor(Math.random() * defaultNumberSetSentence)
    import(`./static/fullSentence/text${sentenceSet}.json`).then(sentenceList => {
      sentenceList = convertObjectToArray(sentenceList)
      let newCurrentList = [], usedPosition = {}
      baseSentenceList = []
      while (newCurrentList.length < maximumWordPerType) {
        let sentencePosition = this.getRandomSentence(sentenceList, usedPosition)
        usedPosition[sentencePosition] = true
        if (!sentenceList[sentencePosition] || !sentenceList[sentencePosition][1] || 
          !sentenceList[sentencePosition][1].eng) continue
        newCurrentList = newCurrentList.concat(sentenceList[sentencePosition][1].eng.split(' '))
        while (newCurrentList.length > baseSentenceList.length) {
          baseSentenceList.push(sentenceList[sentencePosition][1])
        }
      }
      this.setState({ currentList: newCurrentList, currentWordPosition: 0, currentWord: baseSentenceList[0] })
    })
  }

  handleChangeMode = (event) => {
    this.setState({ typingMode: event.target.value }, () => {
      this.handleReload()
    })
  }

  handleChangeDifficult = (event, value) => {
    this.setState({ difficultLevel: value }, () => {
      this.handleReload()
    })
  }

  preLoadSound = (position) => {
    const { currentList } = this.state
    if (position >= currentList.length) return
    let newWord = baseListFull[currentList[position]]
    this.playSound(newWord.word, true) // load but not play
  }

  goNextWord = (isCorrect) => {
    const { typedWord, currentWord, currentWordPosition,
      currentList, correctList, currentTypingWord, typingMode, soundMode } = this.state

    let newWordPosition = currentWordPosition + 1
    if (newWordPosition >= currentList.length) return
    let isWordCorrect = currentList[currentWordPosition] === currentTypingWord

    if (typingMode === 'Random Word') {
      let newTypedWord = [...typedWord]
      if (isCorrect)
        newTypedWord.push(currentWord.word)  
      let newWord = baseListFull[currentList[newWordPosition]]
      this.setState({
        typedWord: newTypedWord,
        currentWord: newWord,
        currentWordPosition: newWordPosition,
        currentTypingWord: '',
        currentCorrect: true,
        correctList: [...correctList, isWordCorrect],
      }, () => {
        if (soundMode === 'Auto On') {
          this.playSound()
          // this.preLoadSound(newWordPosition + 1)
        }
      })
    } else {
      let newWord = baseSentenceList[newWordPosition]
      this.setState({
        currentWord: newWord,
        currentWordPosition: newWordPosition,
        currentTypingWord: '',
        currentCorrect: true,
        correctList: [...correctList, isWordCorrect],
      })
    }
  }

  goNextLine = () => {
    this.setState({ firstDisplay: this.state.currentWordPosition })
  }

  handleStart = () => {
    if (this.state.typingMode === 'Random Word' && this.state.soundMode === 'Auto On')
      this.playSound()

    this.setState({
      typingState: 'running',
      countDownTime: defaultCountTime,
    })
    if (this.state.timeMode === '60s') {
      this.timer = setInterval(() => {
        let { countDownTime } = this.state
        this.setState({ countDownTime: countDownTime - 1 })
        if (countDownTime === 1)
          this.handleStop();
      }, 1000)
    }
  }

  handleStop = () => {
    clearInterval(this.timer)
    this.setState({ typingState: 'ending' })
  }

  handleReload = () => {
    clearInterval(this.timer)
    let typingMode = this.state.typingMode
    this.setState({
      firstDisplay: 0,
      correctList: [],
      currentCorrect: true,
      currentTypingWord: '',
      typingState: 'waiting',
      countDownTime: defaultCountTime,
      typeDictionary: '',
    }, () => {
      if (typingMode === 'Random Word') {
        this.generateListWord()
      } else {
        this.generateListSentence()
      }
    })
  }

  playSoundBlob = async (blob, isSilenceMode) => {
    if (isSilenceMode) { // just for pre-download
      return
    }
    let blobUrl = URL.createObjectURL(blob)
    if (audioPoolStack.length === 0) {
      audioPoolStack.push(new Audio())
    }
    let audio = audioPoolStack.pop()
    audio.src = blobUrl
    await audio.play()
    audioPoolStack.push(audio)
  }

  playSound = async (targetedWord = null, isSilenceMode = false) => {
    const { currentWord } = this.state
    let word = targetedWord || currentWord.word
    if (word) {
      const cachedSound = await db.sounds.get(word)
      if (cachedSound && cachedSound.soundBlob) {
        let blob = cachedSound.soundBlob
        this.playSoundBlob(blob, isSilenceMode)
        return 
      }

      // fetch network when cached sound is not existed
      let soundModule = await import(`./static/soundWebm/${word}.webm`)
      if (soundModule && soundModule.default) {
        let res = await fetch(soundModule.default)
        let data = await res.body.getReader().read()
        let blob = new Blob([data.value], { type: "audio/webm" })
        this.playSoundBlob(blob, isSilenceMode)
        db.sounds.put({word: word, soundBlob: blob})
      }
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

  handleUpdateTyping = (newWord, newCurrentCorrect) => {
    this.setState({ currentTypingWord: newWord, currentCorrect: newCurrentCorrect })
  }

  handleChangeSoundMode = (event) => {
    this.setState({ soundMode: event.target.value }, () => {
    })
  }

  handleChangeTimeMode = (event) => {
    this.setState({ timeMode: event.target.value }, () => {
      this.handleReload()
    })
  }

  render() {
    const { typingMode, currentList, currentWord, currentWordPosition, typeDictionary,
      firstDisplay, correctList, currentCorrect,
      currentTypingWord, typingState, countDownTime, timeMode
    } = this.state
    return (
      <div>
        <Title></Title>
        <FilterSection
          handleChangeMode={this.handleChangeMode}
          typingMode={typingMode}
          handleChangeDifficult={this.handleChangeDifficult} 
          handleChangeSoundMode={this.handleChangeSoundMode}
          handleChangeTimeMode={this.handleChangeTimeMode}/>

        <TypingSection
          currentList={currentList}
          currentWordPosition={currentWordPosition}
          typingMode={typingMode}
          goNextWord={this.goNextWord}
          handleStop={this.handleStop}
          handleReload={this.handleReload}
          handleHotKey={this.handleHotKey}
          handleStart={this.handleStart}
          goNextLine={this.goNextLine}
          handleUpdateTyping={this.handleUpdateTyping}
          firstDisplay={firstDisplay}
          correctList={correctList}
          currentCorrect={currentCorrect}
          currentTypingWord={currentTypingWord}
          typingState={typingState}
          countDownTime={countDownTime}
          timeMode={timeMode}
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

export default App;
