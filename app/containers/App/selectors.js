
import { createSelector } from 'reselect';
import { getVal } from 'react-redux-firebase';

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
  firebaseState => getVal(firebaseState, 'auth')
);

const makeSelectProfile = () => createSelector(
  selectFirebase,
  firebaseState => getVal(firebaseState, 'profile')
);

const makeSelectIsSpotifyConnected = () => createSelector(
  selectFirebase,
  firebaseState => {
    const profile = getVal(firebaseState, 'profile');
    return profile.oauth && profile.oauth.spotify && profile.oauth.spotify.accessToken;
  }
);

export {
  selectGlobal,
  makeSelectCurrentlyPlaying,
  makeSelectLocation,
  makeSelectAuth,
  makeSelectProfile,
  makeSelectIsSpotifyConnected,
};
