
import { fromJS } from 'immutable';
import { ADD_TRACK_SUCCESS, REMOVE_TRACK, ADD_TRACK_ERROR } from './constants';

// TODO remove let TRACKS
const today = new Date();
let TRACKS = [];
for (let i = 0; i < 5; i++) {
  TRACKS.push({
    id: Math.random(),
    title: 'Too Good At Goodbyes',
    artist: 'Sam Smith',
    source: 'YouTube',
    created_at: `${today.getMonth() + 1} / ${today.getDate()} / ${today.getFullYear()}`,
  });
}

const initialState = fromJS({
  tracks: TRACKS,
  isTrackURLError: false,
  trackURLErrorMessage: '',
});

function libraryReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TRACK_SUCCESS:
      return state
        .set('isTrackURLError', false)
        .set('trackURLErrorMessage', '')
        .update('tracks', tracks => tracks.unshift(action.track));
    case ADD_TRACK_ERROR:
      return state
        .set('isTrackURLError', true)
        .set('trackURLErrorMessage', action.message);
    case REMOVE_TRACK:
      const index = state.get('tracks').indexOf(action.track);
      return state.update('tracks', tracks => tracks.delete(index));
    default:
      return state;
  }
}

export default libraryReducer;
