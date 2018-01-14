
import React from 'react';
import Player from 'youtube-player';

class YouTube extends React.Component {

  player;

  componentDidMount() {
    this.player = Player('youtube-player');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isPlaying) {
      this.player.getPlayerState().then(playerState => {
        if (playerState === 5) {
          this.player.loadVideoById(nextProps.track);
        }
        this.player.playVideo();
      });
    } else {
      this.player.pauseVideo();
    }
  }

  render() {
    return <div id='youtube-player' style={{ display: 'none' }} />
  }
}

export default YouTube;
