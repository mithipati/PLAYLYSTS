
import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');

const selectRoute = state => state.get('route');

const selectFirebase = state => state.get('firebase');

const makeSelectCurrentlyPlaying = () => createSelector(
  selectGlobal,
  globalState => globalState.get('currentlyPlaying')
);

const makeSelectLocation = () => createSelector(
  selectRoute,
  routeState => routeState.get('location')
);

const makeSelectAuth = () => createSelector(
  selectFirebase,
  firebaseState => firebaseState.auth
);

export {
  selectGlobal,
  makeSelectCurrentlyPlaying,
  makeSelectLocation,
  makeSelectAuth,
};
