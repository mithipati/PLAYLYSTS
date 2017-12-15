
import { fromJS } from 'immutable';
import { ADD_TRACK_SUCCESS, REMOVE_TRACK, CHANGE_TRACK_URL, ADD_TRACK_ERROR } from './constants';

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
  trackURL: '',
  isTrackURLError: false,
});

function libraryReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TRACK_SUCCESS:
      return state
        .set('trackURL', '')
        .set('isTrackURLError', false)
        .update('tracks', tracks => tracks.unshift(action.track));
    case ADD_TRACK_ERROR:
      return state.set('isTrackURLError', true);
    case CHANGE_TRACK_URL:
      return state
        .set('isTrackURLError', false)
        .set('trackURL', action.url);
    case REMOVE_TRACK:
      const index = state.get('tracks').indexOf(action.track);
      return state.update('tracks', tracks => tracks.delete(index));
    default:
      return state;
  }
}

export default libraryReducer;
