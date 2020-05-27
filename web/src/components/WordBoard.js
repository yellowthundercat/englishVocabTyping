import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
  },
};

class WordBoard extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        WordBoard
      </div>
    )
  }
}

export default withStyles(styles)(WordBoard);