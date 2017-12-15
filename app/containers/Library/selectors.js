
import { createSelector } from 'reselect';

const selectLibrary = (state) => state.get('library');

const makeSelectTracks = () => createSelector(
  selectLibrary,
  (libraryState) => libraryState.get('tracks')
);

const makeSelectTrackURL = () => createSelector(
  selectLibrary,
  (libraryState) => libraryState.get('trackURL')
);

const makeSelectIsTrackURLError = () =>  createSelector(
  selectLibrary,
  (libraryState) => libraryState.get('isTrackURLError')
);

export {
  selectLibrary,
  makeSelectTracks,
  makeSelectTrackURL,
  makeSelectIsTrackURLError,
};
