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
    }
  }
  
  componentDidMount() {
  }

  goNextLine = () => {
    this.setState({firstDisplay: this.props.currentWordPostition})
  }

  render() {
    const { classes, typingState, currentList, currentWordPosition  } = this.props
    const { firstDisplay, correctList, currentCorrect } = this.state
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
        <WordInputSection />
      </div>
    )
  }
}

export default withStyles(styles)(TypingSection);