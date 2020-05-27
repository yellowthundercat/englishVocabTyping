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
    // this.myRef1 = React.createRef();
  }
  
  componentDidMount() {
    // console.log(this.myRef1.current.getBoundingClientRect())
  }

  render() {
    const { classes, typingState, currentList, currentWordPostition  } = this.props
    if (typingState === 'ending') {
      return <ResultTable/>
    }
    return (
      <div className={classes.root}>
        <WordBoard currentList={currentList} currentWordPostition={currentWordPostition}/>
        <WordInputSection />
      </div>
    )
  }
}

export default withStyles(styles)(TypingSection);