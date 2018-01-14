
import { createSelector } from 'reselect';

const selectPlayer = (state) => state.get('player');

const makeSelectIsCurrentlyPlaying = () => createSelector(
  selectPlayer,
  playerState => playerState.get('isCurrentlyPlaying')
);

const makeSelectCurrentTrack = () => createSelector(
  selectPlayer,
  playerState => playerState.get('currentTrack')
);

const makeSelectCurrentSource = () => createSelector(
  makeSelectCurrentTrack(),
  currentTrack => currentTrack.getIn(['source', 'name'])
);

export {
  selectPlayer,
  makeSelectIsCurrentlyPlaying,
  makeSelectCurrentTrack,
  makeSelectCurrentSource,
};
