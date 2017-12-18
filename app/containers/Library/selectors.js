
import { createSelector } from 'reselect';

const selectLibrary = (state) => state.get('library');

const makeSelectTracks = () => createSelector(
  selectLibrary,
  (libraryState) => libraryState.get('tracks')
);

const makeSelectIsTrackURLError = () =>  createSelector(
  selectLibrary,
  (libraryState) => libraryState.get('isTrackURLError')
);

const makeSelectTrackURLErrorMessage = () => createSelector(
  selectLibrary,
  (libraryState) => libraryState.get('trackURLErrorMessage')
);

export {
  selectLibrary,
  makeSelectTracks,
  makeSelectIsTrackURLError,
  makeSelectTrackURLErrorMessage,
};
