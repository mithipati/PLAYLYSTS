
import { createSelector } from 'reselect';

const selectLibrary = (state) => state.get('library');

const makeSelectTracks = () => createSelector(
  selectLibrary,
  (libraryState) => libraryState.get('tracks')
);

export {
  selectLibrary,
  makeSelectTracks,
};
