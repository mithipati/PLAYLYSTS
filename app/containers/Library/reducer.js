
import { fromJS } from 'immutable';
import { ADD_TRACK_SUCCESS, REMOVE_TRACK } from './constants';
import TRACKS from './tracksDummyData';

const initialState = fromJS({
  tracks: TRACKS,
});

function libraryReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TRACK_SUCCESS:
      return state.update('tracks', tracks => tracks.unshift(action.track));
    case REMOVE_TRACK:
      const index = state.get('tracks').indexOf(action.track);
      return state.update('tracks', tracks => tracks.delete(index));
    default:
      return state;
  }
}

export default libraryReducer;
