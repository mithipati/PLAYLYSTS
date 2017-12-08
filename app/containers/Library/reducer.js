
import { fromJS } from 'immutable';
import { ADD_SONG_SUCCESS, REMOVE_SONG, CHANGE_SONG_LINK, ADD_SONG_ERROR } from './constants';

// TODO remove let SONGS
const today = new Date();
let SONGS = [];
for (let i = 0; i < 5; i++) {
  SONGS.push({
    id: Math.random(),
    title: 'Too Good At Goodbyes',
    artist: 'Sam Smith',
    source: 'YouTube',
    created_at: `${today.getMonth() + 1} / ${today.getDate()} / ${today.getFullYear()}`,
  });
}

const initialState = fromJS({
  songs: SONGS,
  songLink: '',
  isSongLinkError: false,
});

function libraryReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_SONG_SUCCESS:
      return state
        .set('songLink', '')
        .set('isSongLinkError', false)
        .update('songs', songs => songs.unshift(action.song));
    case ADD_SONG_ERROR:
      return state.set('isSongLinkError', true);
    case CHANGE_SONG_LINK:
      return state
        .set('isSongLinkError', false)
        .set('songLink', action.url);
    case REMOVE_SONG:
      const index = state.get('songs').indexOf(action.song);
      return state.update('songs', songs => songs.delete(index));
    default:
      return state;
  }
}

export default libraryReducer;
