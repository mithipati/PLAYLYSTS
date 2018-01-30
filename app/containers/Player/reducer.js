
import { fromJS } from 'immutable';
import { PLAY_TRACK, PAUSE_TRACK, LOAD_TRACK } from './constants';

// TODO: remove placeholder
const initialState = fromJS({
  isCurrentlyPlaying: false,
  currentTrack: {},
});

function playerReducer(state = initialState, action) {
  switch (action.type) {
    case PLAY_TRACK:
      return state.set('isCurrentlyPlaying', true);
    case PAUSE_TRACK:
      return state.set('isCurrentlyPlaying', false);
    case LOAD_TRACK:
      return state.set('currentTrack', action.track);
    default:
      return state;
  }
}

export default playerReducer;
