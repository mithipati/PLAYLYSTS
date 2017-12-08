
import { select, put, takeLatest } from 'redux-saga/effects';

import { ADD_SONG } from '../containers/Library/constants';
import { addSongSuccess, addSongError } from '../containers/Library/actions';
import { fromJS } from 'immutable';

export function* getMetadata(action) {
  const song = fromJS({
    id: Math.random(),
    title: action.url,
    artist: 'Sam Smith',
    source: 'SPOTIFY',
    created_at: '12 / 05 / 17',
  });

  yield put(addSongError());
  // yield put(addSongSuccess(song));
}

export default function* parseURL() {
  yield takeLatest(ADD_SONG, getMetadata);
}
