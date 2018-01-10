
import { fromJS } from 'immutable';
import { PLAY_TRACK_SUCCESS, PAUSE_TRACK_SUCCESS } from './constants';

// TODO: remove placeholder
const initialState = fromJS({
  isPlaying: false,
  track: {
    title: 'Too Good At Goodbyes',
    artist: 'Sam Smith',
    duration: 1000,
  }
});

function playerReducer(state = initialState, action) {
  switch (action.type) {
    case PLAY_TRACK_SUCCESS:
      return state
        .set('isPlaying', true)
        .setIn(['track', 'title'], action.data.title)
        .setIn(['track', 'artist'], action.data.artist);
    case PAUSE_TRACK_SUCCESS:
      return state.set('isPlaying', false);
    default:
      return state;
  }
}

export default playerReducer;
