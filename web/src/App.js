import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Title from './components/Title'
import TypingSection from './components/TypingSection'
import FilterSection from './components/FilterSection'
import DictionSection from './components/DictionSection'


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
      difficultLevel: 3
    }
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
