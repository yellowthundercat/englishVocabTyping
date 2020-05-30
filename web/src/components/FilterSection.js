import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import color from '../constant/color'

import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Card from '@material-ui/core/Card';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Checkbox from '@material-ui/core/Checkbox'


const styles = theme => ({
  formTitle: {
    margin: 'auto',
    paddingRight: 20,
    fontSize: 16,
    color: color.black,
    fontWeight: 500,
    [theme.breakpoints.down('xs')]: {
      paddingRight: 5,
    },
  },
  modeLabel: {
    [theme.breakpoints.down('xs')]: {
      fontSize: 15,
      margin: 0,
    },
  },
  modeButton: {
    [theme.breakpoints.down('xs')]: {
      size: '10px',
      margin: 0,
      marginLeft: 5,
      padding: 2,
    },
  },
  difficultForm: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
  },
  sliderwraper: {
    display: 'inline-block',
    width: 220,
    marginLeft: 30,
    [theme.breakpoints.down('xs')]: {
      marginLeft: 20,
    },
  },
  difficultTitle: {
    fontSize: 16,
    fontWeight: 500,
  },
  optionCard: {
    padding: 20,
    marginBottom: 10,
    [theme.breakpoints.down('xs')]: {
      padding: 15,
    },
  },
  optionWrapper: {
    width: 'min(430px, 98%)',
    marginLeft: 'max(calc((100% - 820px)/2), 2px)',
  },
  optionButton: {
    marginBottom: 10,
    [theme.breakpoints.down('xs')]: {
      fontSize: 15,
    },
  },
});

const difficultLevel = [
  { label: 'kid', value: 1 },
  { label: 'beginner', value: 2 },
  { label: 'easy', value: 3 },
  { label: 'normal', value: 4 },
  { label: 'hard', value: 5 },
]

class FilterSectionCore extends React.Component {
  valuetext = (value) => {
    return value + 'level'
  }
  render() {
    const { classes, handleChangeMode, typingMode,
      handleChangeDifficult } = this.props
    let isShowDifficulty = typingMode === 'Random Word'
    return (   
        <Card className={classes.optionCard}>
          {/* mode */}
          <FormControl component='fieldset'>
            <RadioGroup row aria-label='modeChoosing' name='modeChoosing' onChange={handleChangeMode} defaultValue='Random Word'>
              <Typography component='span' className={classes.formTitle} disabled>Mode</Typography>
              <FormControlLabel
                className={classes.modeLabel}
                value='Random Word'
                control={<Radio color="default" className={classes.modeButton}/>}
                label='Random Word' />
              <FormControlLabel
                className={classes.modeLabel}
                value='Full Sentence'
                control={<Radio color="default" className={classes.modeButton}/>}
                label='Full Sentence' />
            </RadioGroup>
          </FormControl>

          {/* difficulty and guide */}
          {isShowDifficulty &&
            <div>
              <div className={classes.difficultForm}>
                <Typography id="discrete-slider-always" component='span'
                  className={classes.difficultTitle}>
                  Difficulty
                </Typography>
                <div className={classes.sliderwraper}>
                  <Slider
                    defaultValue={3}
                    getAriaValueText={this.valuetext}
                    aria-labelledby="discrete-slider-always"
                    step={1}
                    min={1}
                    max={5}
                    marks={difficultLevel}
                    color='secondary'
                    onChangeCommitted={handleChangeDifficult}
                  />
                </div>
              </div>
              <div>In input box:</div>
              <div>Press 1 for listening the current word</div>
              <div>Press 2 to show English dictionary</div>
              <div>Press 3 to show Vietnam dictionary</div>
              <div>Press again to hide them</div>
            </div>
          }
          {!isShowDifficulty &&
            <div>
              <div>In input box:</div>
              <div>Press 1 to show Vietnamese meaning</div>
              <div>Press 1 again to hide it</div>
            </div>
          }
        </Card>
    )
  }
}

class FilterSection extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      isExpand: false 
    }
  }
  handleOptionButton = () => {
    let newExpand = !this.state.isExpand
    this.setState({ isExpand: newExpand })
  }
  render() {
    const { classes, handleChangeMode, typingMode, handleChangeDifficult } = this.props
    return (
      <div>
        <div className={classes.optionWrapper}>
        <Button
        variant="contained"
        onClick={this.handleOptionButton}
        className={classes.optionButton}
        endIcon={<ExpandMoreIcon />}
        >
          Option and Guide
        </Button>
        <Collapse in={this.state.isExpand}>
          <FilterSectionCore
            classes={classes}
            handleChangeMode={handleChangeMode}
            typingMode={typingMode} 
            handleChangeDifficult={handleChangeDifficult}/>
        </Collapse>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(FilterSection);