import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
  },
};

class ResultTable extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        ResultTable
      </div>
    )
  }
}

export default withStyles(styles)(ResultTable);