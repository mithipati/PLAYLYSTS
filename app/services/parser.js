
import { put, call, takeLatest } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { startSubmit, stopSubmit, reset } from 'redux-form/immutable';

import request from '../utils/request';
import { SOUNDCLOUD_CLIENT_ID } from '../secret';

import { ADD_TRACK } from '../containers/Library/constants';
import { addTrackSuccess } from '../containers/Library/actions';

function _getCurrentDate() {
  const today = new Date();
  return `${today.getMonth() + 1} / ${today.getDate()} / ${today.getFullYear()}`;
}

function* getTrack({ trackURL }) {
  yield put(startSubmit('track'));

  const requestURL = `http://api.soundcloud.com/resolve?url=${trackURL}&client_id=${SOUNDCLOUD_CLIENT_ID}`;

  try {

    const trackData = yield call(request, requestURL);

    if (trackData.kind !== 'track') {
      yield put(stopSubmit('track', { track: 'Must be a valid track link.' }));
      return false;
    }

    const track = fromJS({
      id: Math.random(),
      title: trackData.title,
      artist: trackData.user.username,
      source: 'SoundCloud',
      created_at: _getCurrentDate(),
    });
    yield put(addTrackSuccess(track));
    yield put(reset('track'));

  } catch (error) {

    let errorMessage = error.message;

    if (error.message === 'Not Found') {
      errorMessage = 'Track could not be found. Please try another track.'
    }

    yield put(stopSubmit('track', { track: errorMessage }));

  }
}

export default function* parse() {
  yield takeLatest(ADD_TRACK, getTrack);
}
