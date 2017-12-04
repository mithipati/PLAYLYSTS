
import React from 'react';
import classNames from 'classnames';

import Typography from 'material-ui/Typography';
import { LinearProgress } from 'material-ui/Progress';

import { withStyles } from 'material-ui/styles';
import styles from './style';
import './native-styles.scss';
import Ionicon from 'react-ionicons'

class Player extends React.Component {
  state = {
    completed: 60,
  };

  render() {
    const { classes } = this.props;

    return (
      <div className='root'>
          <div className='title-artist-container'>
            <Typography type='subheading' gutterBottom={true} className={classNames(classes.title)}>
              Too Good At Goodbyes
            </Typography>
            <Typography type='subheading' gutterBottom={true} className={classNames(classes.artist)}>
              Sam Smith
            </Typography>
          </div>
          <div className='playback-container'>
            <div className='playback-buttons'>
              <Ionicon className='iconButton' icon='ios-skip-backward-outline' fontSize='30px' color='#40C4FF'/>
              <Ionicon className='play iconButton' icon='ios-play-outline' fontSize='50px' color='#40C4FF'/>
              <Ionicon className='iconButton' icon='ios-skip-forward-outline' fontSize='30px' color='#40C4FF'/>
            </div>
            <div className='playback-progress'>
              <LinearProgress className={classes.progress} mode="determinate" color='accent' value={this.state.completed} />
            </div>
          </div>
      </div>
    );
  }
}

export default withStyles(styles)(Player);

