
import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

import TRACKS from '../Library/tracksDummyData';

const selectPlayer = (state) => state.get('player');

const makeSelectCurrentPlaylist = () => createSelector(
  selectPlayer,
  playerState => playerState ? playerState.get('currentPlaylist') : fromJS(TRACKS)
);

const makeSelectCurrentPlaylistCount = () => createSelector(
  makeSelectCurrentPlaylist(),
  currentPlaylist => currentPlaylist.count()
);

const makeSelectCurrentTrackIndex = () => createSelector(
  selectPlayer,
  playerState => playerState ? playerState.get('currentTrackIndex') : -1
);

const makeSelectCurrentTrack = () => createSelector(
  selectPlayer,
  playerState => {
    if (playerState) {
      const currentTrackIndex = playerState.get('currentTrackIndex');

      if (currentTrackIndex !== -1) {
        return playerState.get('currentPlaylist').get(currentTrackIndex);
      } else {
        return fromJS({});
      }
    }
  }
);

const makeSelectCurrentSource = () => createSelector(
  makeSelectCurrentTrack(),
  currentTrack => currentTrack.size ? currentTrack.getIn(['source', 'name']) : ''
);

const makeSelectIsCurrentlyPlaying = () => createSelector(
  selectPlayer,
  playerState => playerState ? playerState.get('isCurrentlyPlaying') : false
);

export {
  selectPlayer,
  makeSelectCurrentPlaylist,
  makeSelectCurrentPlaylistCount,
  makeSelectCurrentTrackIndex,
  makeSelectCurrentTrack,
  makeSelectCurrentSource,
  makeSelectIsCurrentlyPlaying,
};
