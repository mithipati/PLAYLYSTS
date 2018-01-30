
import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

const selectPlayer = (state) => state.get('player');

const makeSelectIsCurrentlyPlaying = () => createSelector(
  selectPlayer,
  playerState => playerState ? playerState.get('isCurrentlyPlaying') : false
);

const makeSelectCurrentTrack = () => createSelector(
  selectPlayer,
  playerState => playerState ? playerState.get('currentTrack') : fromJS({})
);

const makeSelectCurrentSource = () => createSelector(
  makeSelectCurrentTrack(),
  currentTrack => currentTrack.size ? currentTrack.getIn(['source', 'name']) : ''
);

export {
  selectPlayer,
  makeSelectIsCurrentlyPlaying,
  makeSelectCurrentTrack,
  makeSelectCurrentSource,
};
