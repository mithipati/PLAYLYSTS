
import React from 'react';
import Player from 'soundcloud-audio';

import { SOUNDCLOUD_CLIENT_ID } from '../../../../internals/secret';

class SoundCloud extends React.Component {

  player = new Player(SOUNDCLOUD_CLIENT_ID);

  componentWillReceiveProps(nextProps) {
    const { isPlaying, track } = nextProps;
    const prevTrack = this.props.track;

    // determine if new track is being played
    if (
        track.size
        && (!prevTrack.size || prevTrack.get('id') !== track.get('id'))
    ) {
      this.player.stop();
    }

    // determine whether to play or pause track
    if (isPlaying && track.size) {
      this.player.play({
        streamUrl: track.getIn(['source', 'url'])
      });
    } else {
      this.player.pause();
    }
  }

  render() {
    return null;
  }
}

export default SoundCloud;
