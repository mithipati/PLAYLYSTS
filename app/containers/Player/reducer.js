
import { fromJS } from 'immutable';
import { PLAY_TRACK, PAUSE_TRACK } from './constants';

// TODO: remove placeholder
const initialState = fromJS({
  isCurrentlyPlaying: false,
  currentTrack: {
    title: 'Too Good At Goodbyes',
    artist: 'Sam Smith',
    duration: 150000, // 2m 30s
    source: {
      name: 'soundcloud',
      url: 'https://api.soundcloud.com/tracks/251321849/stream',
    }
  }
});

function playerReducer(state = initialState, action) {
  switch (action.type) {
    case PLAY_TRACK:
      return state
        .set('isCurrentlyPlaying', true)
        .set('currentTrack', fromJS(action.track));
    case PAUSE_TRACK:
      return state.set('isCurrentlyPlaying', false);
    default:
      return state;
  }
}

export default playerReducer;
