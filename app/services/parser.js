
import { select, put, call, takeLatest } from 'redux-saga/effects';
import SC from 'soundcloud';

import request from '../utils/request';

import { ADD_SONG } from '../containers/Library/constants';
import { makeSelectSongLink } from '../containers/Library/selectors';
import { addSongSuccess, addSongError } from '../containers/Library/actions';
import { fromJS } from 'immutable';

function _getCurrentDate() {
  const today = new Date();
  return `${today.getMonth() + 1} / ${today.getDate()} / ${today.getFullYear()}`;
}

function* getTrack() {
  let track, errorMessage;

  const trackLink = yield select(makeSelectSongLink());
  const clientID = 'e4874f1ad3d0d58fb061263485641b85';
  const requestURL = `http://api.soundcloud.com/resolve?url=${trackLink}&client_id=${clientID}`;

  try {
    const trackData = yield call(request, requestURL);
    track = fromJS({
      id: Math.random(),
      title: trackData.title,
      artist: trackData.user.username,
      source: 'SoundCloud',
      created_at: _getCurrentDate(),
    });
    yield put(addSongSuccess(track));
  } catch (error) {
    errorMessage = error.message;
    yield put(addSongError(errorMessage));
  }
}

export default function* parse() {
  yield takeLatest(ADD_SONG, getTrack);
}
