
import React from 'react';
import Player from 'soundcloud-audio';

import { SOUNDCLOUD_CLIENT_ID } from '../../../../internals/secret';

class SoundCloud extends React.Component {

  player = new Player(SOUNDCLOUD_CLIENT_ID);

  componentWillReceiveProps(nextProps) {
    if (nextProps.isPlaying) {
      this.player.play({
        streamUrl: nextProps.track
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
