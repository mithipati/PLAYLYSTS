
import React from 'react';
import Player from 'youtube-player';

class YouTube extends React.Component {

  player;

  componentDidMount() {
    this.player = Player('youtube-player');
  }

  componentWillReceiveProps(nextProps) {
    const { isPlaying, track } = nextProps;
    const prevTrack = this.props.track;

    if (!prevTrack.size || prevTrack.get('id') !== track.get('id')) {
      this.player.loadVideoById(
        track.getIn(['source', 'url']).split('v=')[1]
      );
    }

    if (isPlaying) {
      this.player.playVideo();
    } else {
      this.player.pauseVideo();
    }
  }

  render() {
    return <div id='youtube-player' style={{ display: 'none' }} />
  }
}

export default YouTube;
