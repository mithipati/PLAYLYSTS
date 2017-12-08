
import { createSelector } from 'reselect';

const selectLibrary = (state) => state.get('library');

const makeSelectSongs = () => createSelector(
  selectLibrary,
  (libraryState) => libraryState.get('songs')
);

const makeSelectSongLink = () => createSelector(
  selectLibrary,
  (libraryState) => libraryState.get('songLink')
);

const makeSelectIsSongLinkError = () =>  createSelector(
  selectLibrary,
  (libraryState) => libraryState.get('isSongLinkError')
);

export {
  selectLibrary,
  makeSelectSongs,
  makeSelectSongLink,
  makeSelectIsSongLinkError,
};
