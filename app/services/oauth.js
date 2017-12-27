
import { put, call, takeLatest } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import request from '../utils/request';

import { SPOTIFY_OAUTH } from '../containers/App/constants';

function* getAuthorization() {
  try {

  const requestURL = '/api/parse';
  const oauth = yield call(request, requestURL);
  return oauth;

  } catch (error) {

    console.log(error)

  }
}

export default function* authorize() {
  yield takeLatest(SPOTIFY_OAUTH, getAuthorization);
}
