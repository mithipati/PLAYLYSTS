
import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');

const selectFirebase = state => state.get('firebase');

const makeSelectCurrentlyPlaying = () => createSelector(
  selectGlobal,
  globalState => globalState.get('currentlyPlaying')
);

const makeSelectAuth = () => createSelector(
  selectFirebase,
  firebaseState => firebaseState.auth
);

export {
  selectGlobal,
  makeSelectCurrentlyPlaying,
  makeSelectAuth,
};
