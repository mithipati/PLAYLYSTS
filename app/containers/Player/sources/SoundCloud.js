
import React from 'react';
import Player from 'soundcloud-audio';

import { SOUNDCLOUD_CLIENT_ID } from '../../../../internals/secret';

class SoundCloud extends React.Component {

  player = new Player(SOUNDCLOUD_CLIENT_ID);

  componentWillReceiveProps(nextProps) {
    const { isPlaying, track } = nextProps;
    const prevTrack = this.props.track;

    if (!prevTrack.size || prevTrack.get('id') !== track.get('id')) {
      this.player.play({
        streamUrl: nextProps.track.getIn(['source', 'url'])
      });
    }

    if (isPlaying) {
      this.player.play({
        streamUrl: nextProps.track.getIn(['source', 'url'])
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
