import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import color from '../constant/color'

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const styles = theme => ({
  root: {
    // textAlign: 'center',
    marginLeft: 10,
    [theme.breakpoints.up('md')]: {
      marginLeft: '20%',
    },
  },
  formTitle: {
    margin: 'auto',
    paddingRight: 20,
    fontSize: 20,
    color: color.black,
    fontWeight: 500,
  },
  form: {
  },
  difficultForm: {
    width: 200,
  },
});

const difficultLevel = [
  {label: 'kid', value: 1},
  {label: 'beginer', value: 2},
  {label: 'easy', value: 3},
  {label: 'normal', value: 4},
  {label: 'hard', value: 5},
]

class FilterSection extends React.Component {
  valuetext = (value) => {
    return value + 'level'
  }
  render() {
    const { classes, handleChangeMode, typingMode } = this.props
    let isShowDifficulty = typingMode === 'Random Word'
    return (
      <div className={classes.root}>
        {/* mode */}
        <FormControl component='fieldset'>
          <RadioGroup row aria-label='modeChoosing' name='modeChoosing' onChange={handleChangeMode} defaultValue='Random Word'>
            <FormLabel component='span' className={classes.formTitle} disabled>Mode</FormLabel>
            <FormControlLabel
              value='Random Word'
              control={<Radio color="default" />}
              label='Random Word' />
            <FormControlLabel
              value='Full Sentence'
              control={<Radio color="default" />}
              label='Full Sentence' />
          </RadioGroup>
        </FormControl>

        {/* difficulty */}
        {isShowDifficulty &&
        <div className={classes.difficultForm}>
          <Typography id="discrete-slider-always" gutterBottom>
            Difficulty
          </Typography>
          <Slider
            defaultValue={3}
            getAriaValueText={this.valuetext}
            aria-labelledby="discrete-slider-always"
            step={1}
            min={1}
            max={5}
            marks={difficultLevel}
            // valueLabelDisplay="auto"
          />
        </div>
        }
      </div>
    )
  }
}

export default withStyles(styles)(FilterSection);