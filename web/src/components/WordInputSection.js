import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import color from '../constant/color'

const styles = {
  root: {
  },
  textWrapper: {
    width: 750,
    display: 'flex',
    margin: 'auto',
  },
  textArea: {
    background: color.white,
    flexGrow: 10,
    
  },
  inputFont: {
    fontSize: 25,
    padding: 10,
  },
  timer: {
    width: 50,
    flexGrow: 1,
    fontSize: 30,
    margin: 'auto',
    textAlign: 'center',
  },
  reloadButton: {
    flexGrow: 1,
    fontSize: 20,
    padding: 0,
    margin: 5
  },
};

class WordInputSection extends React.Component {
  
  generateTime = () => {
    if (this.props.countDownTime === 60)
      return '1:00'
    if (this.props.countDownTime >= 10)
      return '0:' + this.props.countDownTime
    return '0:0' + this.props.countDownTime
  }
  
  render() {
    const { classes, currentTypingWord, handleTyping, handleKeyTyping, handleReload } = this.props
    return (
      <div className={classes.root}>
        {/* <Grid container className={classes.textWrapper}> */}
        <form className={classes.textWrapper} noValidate autoComplete="off" onSubmit={(event) => { event.preventDefault() }}>
          <TextField id="outlined-basic" variant="outlined" className={classes.textArea} autoFocus
            InputProps={{classes: {input: classes.inputFont}}}
            value={currentTypingWord} onKeyPress={handleKeyTyping}
            onChange={handleTyping} error={false}/>
          <div className={classes.timer}>{this.generateTime()}</div>
          <Button variant="contained" className={classes.reloadButton} onClick={handleReload}>
            Reload
          </Button>
        </form>
        {/* </Grid> */}
      </div>
    )
  }
}

export default withStyles(styles)(WordInputSection);