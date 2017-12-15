
import { select, put, call, takeLatest } from 'redux-saga/effects';

import request from '../utils/request';
import { SOUNDCLOUD_CLIENT_ID } from '../secret';

import { ADD_TRACK } from '../containers/Library/constants';
import { makeSelectTrackURL } from '../containers/Library/selectors';
import { addTrackSuccess, addTrackError } from '../containers/Library/actions';
import { fromJS } from 'immutable';

function _getCurrentDate() {
  const today = new Date();
  return `${today.getMonth() + 1} / ${today.getDate()} / ${today.getFullYear()}`;
}

function* getTrack() {
  let track, errorMessage;

  const trackLink = yield select(makeSelectTrackURL());
  const requestURL = `http://api.soundcloud.com/resolve?url=${trackLink}&client_id=${SOUNDCLOUD_CLIENT_ID}`;

  try {

    const trackData = yield call(request, requestURL);
    track = fromJS({
      id: Math.random(),
      title: trackData.title,
      artist: trackData.user.username,
      source: 'SoundCloud',
      created_at: _getCurrentDate(),
    });
    yield put(addTrackSuccess(track));

  } catch (error) {

    errorMessage = error.message;
    yield put(addTrackError(errorMessage));

  }
}

export default function* parse() {
  yield takeLatest(ADD_TRACK, getTrack);
}
