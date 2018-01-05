
import { put, call, takeLatest } from 'redux-saga/effects';
import { replace } from 'react-router-redux';
import { stopSubmit } from 'redux-form/immutable';
import { getFirebase } from 'react-redux-firebase';
import axios from 'axios';

import { _getErrorMessage } from './helpers';
import { INIT_OAUTH, COMPLETE_OAUTH, REMOVE_OAUTH } from '../containers/App/constants';

function* initOAuth({ source }) {
  try {

    const response = yield call(axios, `/api/oauth/${source}`);
    const { redirectURL } = response.data;

    window.location = redirectURL;

  } catch (error) {

    yield put(stopSubmit('settings', { spotify_oauth: _getErrorMessage(error) }));

  }
}

function* completeOAuth({ data: { source, code } }) {
  try {

    yield put(replace('/'));

    const response = yield call(axios, `/api/oauth/${source}/redirect?code=${code}`);
    const { accessToken } = response.data;
    const { refreshToken } = response.data;

    yield getFirebase().updateProfile({
      [`oauth/${source}/accessToken`]: accessToken,
      [`oauth/${source}/refreshToken`]: refreshToken,
    });

    // dispatch success noty

  } catch (error) {

    yield put(stopSubmit('settings', { spotify_oauth: _getErrorMessage(error) }));

  }
}

function* removeOAuth({ source }) {
  try {

    yield getFirebase().updateProfile({
      [`oauth/${source}/accessToken`]: '',
      [`oauth/${source}/refreshToken`]: '',
    });

    // dispatch success noty

  } catch (error) {

    yield put(stopSubmit('settings', { spotify_oauth: _getErrorMessage(error) }));

  }
}

export default function* oauth() {
  yield [
    takeLatest(INIT_OAUTH, initOAuth),
    takeLatest(COMPLETE_OAUTH, completeOAuth),
    takeLatest(REMOVE_OAUTH, removeOAuth),
  ];
}
