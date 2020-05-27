import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
  },
};

class WordInputSection extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        WordInput
      </div>
    )
  }
}

export default withStyles(styles)(WordInputSection);