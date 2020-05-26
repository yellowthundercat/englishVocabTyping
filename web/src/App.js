import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Title from './components/Title'
import TypingSection from './components/TypingSection'
import FilterSection from './components/FilterSection'
import DictionSection from './components/DictionSection'

import color from './constant/color'

const styles = {
  root: {
    
  },
};

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      typingMode: 'Random Word'
    }
  }

  handleChangeMode = (event) => {
    this.setState({ typingMode: event.target.value })
  }

  render() {
    const { classes } = this.props
    const { typingMode } = this.state
    return (
      <div className={classes.root}>
        <Title></Title>
        <FilterSection handleChangeMode={this.handleChangeMode} typingMode={typingMode}></FilterSection>
        <TypingSection></TypingSection>
        <DictionSection></DictionSection>
      </div>
    )
  }
}

export default withStyles(styles)(App);
