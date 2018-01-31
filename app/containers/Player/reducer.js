
import { fromJS } from 'immutable';
import { PLAY_TRACK, PAUSE_TRACK, LOAD_TRACK, NEXT_TRACK, PREV_TRACK, STOP_TRACK } from './constants';
import TRACKS from '../Library/tracksDummyData';

// TODO: remove placeholder
const initialState = fromJS({
  currentPlaylist: TRACKS,
  currentTrackIndex: -1,
  isCurrentlyPlaying: false,
});

function playerReducer(state = initialState, action) {
  switch (action.type) {
    case PLAY_TRACK:
      return state.set('isCurrentlyPlaying', true);
    case PAUSE_TRACK:
      return state.set('isCurrentlyPlaying', false);
    case LOAD_TRACK:
      const currentPlaylistSize = state.get('currentPlaylist').count();

      let currentTrackIndex = state.get('currentTrackIndex');
      if (typeof action.trackIndex !== 'undefined') {
        currentTrackIndex = action.trackIndex;
      } else if (action.trackIndex >= currentPlaylistSize) {
        currentTrackIndex = -1;
      }

      return state.set('currentTrackIndex', currentTrackIndex);
    case NEXT_TRACK:
      const nextTrackIndex = state.get('currentTrackIndex') + 1;
      return state.set('currentTrackIndex', nextTrackIndex);
    case PREV_TRACK:
      const prevTrackIndex = state.get('currentTrackIndex') - 1;
      return state.set('currentTrackIndex', prevTrackIndex);
    case STOP_TRACK:
      return state
        .set('currentTrackIndex', -1)
        .set('isCurrentlyPlaying', false);
    default:
      return state;
  }
}

export default playerReducer;
