
import { put, call, takeLatest } from 'redux-saga/effects';
import { replace } from 'react-router-redux';
import { getFirebase } from 'react-redux-firebase';
import { stopSubmit } from 'redux-form/immutable';
import axios from 'axios';

import { _getErrorMessage } from './helpers';
import { INIT_OAUTH, COMPLETE_OAUTH } from '../containers/App/constants';

function* initOAuth({ source }) {
  try {

    const { data: { redirectURL } } = yield call(axios, `/api/oauth/${source}`);
    window.location = redirectURL;

  } catch (error) {

    yield put(stopSubmit('settings', { spotify_oauth: _getErrorMessage(error) }));

  }
}

function* completeOAuth({ data: { source, code } }) {
  try {

    yield put(replace('/'));

    const { data: { accessToken, refreshToken } } = yield call(axios, `/api/oauth/${source}/redirect?code=${code}`);

    yield getFirebase().updateProfile({
      [`oauth/${source}/accessToken`]: accessToken,
      [`oauth/${source}/refreshToken`]: refreshToken,
    });

    // dispatch success noty

  } catch (error) {

    yield put(stopSubmit('settings', { spotify_oauth: _getErrorMessage(error) }));

  }
}

export default function* oauth() {
  yield [
    takeLatest(INIT_OAUTH, initOAuth),
    takeLatest(COMPLETE_OAUTH, completeOAuth)
  ];
}
