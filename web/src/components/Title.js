import React from 'react';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  root: {
    textAlign: 'center',
    fontSize: 45,
    fontFamily: "Times New Roman",
    [theme.breakpoints.down('xs')]: {
      fontSize: 30,
    },
  },
});

class Title extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <h1 className={classes.root}>
        English Typing
      </h1>
    )
  }
}

export default withStyles(styles)(Title);