
import React from 'react';
import SoundCloudPlayer from 'soundcloud-audio';
import YouTubePlayer from 'youtube-player';
import classNames from 'classnames';

import { SOUNDCLOUD_CLIENT_ID } from '../../../internals/secret';

import Typography from 'material-ui/Typography';
import { LinearProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';
import styles from './style';
import './native-styles.scss';
import Ionicon from 'react-ionicons'

class Player extends React.Component {

  state = {
    isPlaying: false,
  };

  scPlayer = new SoundCloudPlayer(SOUNDCLOUD_CLIENT_ID);
  ytPlayer;

  componentDidMount() {
    // this.ytPlayer = YouTubePlayer('yt-player');
    // this.ytPlayer.loadVideoById('Oapebl0bADA');
    // this.ytPlayer.playVideo();
    this.scPlayer.preload('https://api.soundcloud.com/tracks/251321849/stream');
    // this.scPlayer.play({ streamUrl: 'https://api.soundcloud.com/tracks/251062262/stream' });
    // this.scPlayer.resolve('https://soundcloud.com/wearegraves/see-the-whole-world-featuring-tsrk-jsun', (track) => {
    //   console.log(track);
    // });
  }

  componentDidUpdate() {
    this.state.isPlaying ? this.scPlayer.play() : this.scPlayer.pause();
  }

  togglePlayer = () => {
    this.setState({ isPlaying: !this.state.isPlaying });
    // this.setState({ isPlaying: !this.state.isPlaying }, () => {
    //   this.state.isPlaying ? this.ytPlayer.pauseVideo() : this.ytPlayer.playVideo();
    // });
  };

  render() {
    const { title, artist, classes } = this.props;

    return (
      <div className='root'>
        <div className='title-artist-container'>
          <Typography type='subheading' gutterBottom={false} className={classNames(classes.title)}>
            { title }
          </Typography>
          <Typography type='subheading' gutterBottom={true} className={classNames(classes.artist)}>
            { artist }
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
              onClick={ this.togglePlayer }
              className='play-pause-button iconButton'
              icon={ this.state.isPlaying ? 'ios-pause-outline' : 'ios-play-outline' }
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
            <LinearProgress className={classes.progress} mode="determinate" color='accent' value={60} />
          </div>
        </div>
        <div id='yt-player' />
      </div>
    );
  }
}

export default withStyles(styles)(Player);

