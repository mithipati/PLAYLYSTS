
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import SoundCloud from './sources/SoundCloud';
import YouTube from './sources/YouTube';

import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import reducer from './reducer';
import player from '../../services/player';
import { playTrack, pauseTrack } from './actions';
import {
  makeSelectIsCurrentlyPlaying,
  makeSelectCurrentTrack,
  makeSelectCurrentSource,
} from './selectors';

import classNames from 'classnames';
import Typography from 'material-ui/Typography';
import { LinearProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';
import styles from './style';
import './native-styles.scss';
import Ionicon from 'react-ionicons'

class Player extends React.Component {

  handlePlayPause = () => {
    const { isCurrentlyPlaying, currentTrack, playTrack, pauseTrack } = this.props;

    if (currentTrack.size) {
      isCurrentlyPlaying ? pauseTrack() : playTrack();
    }
  };

  render() {
    const { isCurrentlyPlaying, currentTrack, currentSource, classes } = this.props;

    return (
      <div className='root'>
        <div className='title-artist-container'>
          <Typography type='subheading' gutterBottom={false} className={ classNames(classes.title) }>
            { currentTrack.get('title') }
          </Typography>
          <Typography type='subheading' gutterBottom={true} className={ classNames(classes.artist) }>
            { currentTrack.get('artist') }
          </Typography>
        </div>
        <div className='playback-container'>
          <div className='playback-buttons'>
            <Ionicon
              className='iconButton'
              icon='ios-skip-backward-outline'
              fontSize='30px'
              color='#40C4FF'
            />
            <Ionicon
              onClick={ this.handlePlayPause }
              className='play-pause-button iconButton'
              icon={ isCurrentlyPlaying ? 'ios-pause-outline' : 'ios-play-outline' }
              fontSize='50px'
              color='#40C4FF'
            />
            <Ionicon
              className='iconButton'
              icon='ios-skip-forward-outline'
              fontSize='30px'
              color='#40C4FF'
            />
          </div>
          <div className='playback-progress'>
            <LinearProgress className={ classes.progress } mode="determinate" color='accent' value={60} />
          </div>
          <SoundCloud
            track={ currentTrack }
            isPlaying={ isCurrentlyPlaying && currentSource === 'soundcloud' }
          />
          <YouTube
            track={ currentTrack }
            isPlaying={ isCurrentlyPlaying && currentSource === 'youtube' }
          />
        </div>
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    playTrack: () => dispatch(playTrack()),
    pauseTrack: () => dispatch(pauseTrack()),
  };
}

const mapStateToProps = createStructuredSelector({
  isCurrentlyPlaying: makeSelectIsCurrentlyPlaying(),
  currentTrack: makeSelectCurrentTrack(),
  currentSource: makeSelectCurrentSource(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'player', reducer });
const withPlayerSaga = injectSaga({ key: 'player', saga: player });

export default compose(
  withStyles(styles),
  withReducer,
  withPlayerSaga,
  withConnect,
)(Player);
