
import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const makeSelectCurrentlyPlaying = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('currentlyPlaying')
);

export {
  selectGlobal,
  makeSelectCurrentlyPlaying,
};
