import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import color from '../constant/color'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import IconButton from '@material-ui/core/IconButton'

const styles = theme => ({
  root: { 
    marginTop: 40,
    [theme.breakpoints.down('xs')]: {
      marginTop: 15,
    },
  },
  wrapper: {
    width: 'min(500px, 90%)',
    margin: 'auto',
  },
  word: {
    fontSize: 30,
    color: color.darkBlue,
    [theme.breakpoints.down('xs')]: {
      fontSize: 23,
    },
  },
  pronunciation: {
    fontSize: 23,
    color: color.gray,
    marginLeft: 10,
    [theme.breakpoints.down('xs')]: {
      fontSize: 19,
      marginLeft: 7,
    },
  },
  meaningWrapper: {
    padding: 10,
    [theme.breakpoints.down('xs')]: {
      padding: 7,
    },
  },
  defWrapper: {
    fontSize: 18,
    [theme.breakpoints.down('xs')]: {
      fontSize: 16,
    },
  },
  pos: {
    color: color.gray,
    padding: 5,
  },
  definition: {
    fontWeight: 500,
  },
  example: {
    marginLeft: 10,
    padding: 5,
  },
  synonyms: {
    marginLeft: 10,
    padding: 2,
  },
  volume: {
    marginLeft: 10,
    marginTop: -5,
    [theme.breakpoints.down('xs')]: {
      marginLeft: 5,
    },
  },
  sentence: {
    fontSize: 20,
    margin: 10,
    [theme.breakpoints.down('xs')]: {
      fontSize: 18,
    },
  }
});

class DictionSection extends React.Component {
  generateMeaning = () => {
    const {typeDictionary, currentWord, classes} = this.props
    let meaning = currentWord.engMeaning
    if (typeDictionary === 'Vietnam')
      meaning = currentWord.vietMeaning
    if (!currentWord.word || !meaning) return(<div></div>)

    return meaning.map((item, index) => 
      <div className={classes.meaningWrapper} key={`diction-meaning-${index}-${currentWord.word}`}>
        <div className={classes.defWrapper}>
          +
          {item.pos && <span className={classes.pos}>[{item.pos}]</span>}
          {item.definition && <span className={classes.definition}>{item.definition}</span>}
        </div>
        {item.example && <div className={classes.example}>Ex: {item.example}</div>}
        {item.synonyms && <div className={classes.synonyms}>Synonyms: {item.synonyms.join(', ')}</div>}
      </div>
    )
  }
  render() {
    const { classes, typeDictionary, currentWord, typingMode } = this.props
    
    if (!typeDictionary || !currentWord ||
      (typingMode === 'Full Sentence' && typeDictionary !== 'Vietnam')) {
      return (<div></div>)
    }
    if (typingMode === 'Full Sentence') {
      return (
      <div className={classes.root}>
        <Card className={classes.wrapper}>
          <CardContent>
            <div className={classes.sentence}>{currentWord.eng}</div>
            <div className={classes.sentence}>{currentWord.viet}</div>
          </CardContent>
        </Card>
      </div>
      )
    }

    return(
      <div className={classes.root}>
        <Card className={classes.wrapper}>
          <CardContent>
            <div className={classes.title}>
              <span className={classes.word}>{currentWord.word}</span>
              {currentWord.pronunciation && <span className={classes.pronunciation}>/{currentWord.pronunciation}/</span>}
              <IconButton aria-label="volume" className={classes.volume} onClick={this.props.playSound}>
                <VolumeUpIcon/>
              </IconButton>
            </div>
            {this.generateMeaning()}
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default withStyles(styles)(DictionSection);