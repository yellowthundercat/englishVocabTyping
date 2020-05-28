import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import color from '../constant/color'
import Grid from '@material-ui/core/Grid';

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
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        {/* <Grid container className={classes.textWrapper}> */}
        <form noValidate autoComplete="off" className={classes.textWrapper}>
          <TextField id="outlined-basic" variant="outlined" className={classes.textArea} autoFocus
            InputProps={{classes: {input: classes.inputFont}}}/>
          <div className={classes.timer}>1:00</div>
          <Button variant="contained" className={classes.reloadButton}>Reload</Button>
        </form>
        {/* </Grid> */}
      </div>
    )
  }
}

export default withStyles(styles)(WordInputSection);