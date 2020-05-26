import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import color from '../constant/color'

const styles = {
  root: { 
  },
};

class DictionSection extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        DictionSection
      </div>
    )
  }
}

export default withStyles(styles)(DictionSection);