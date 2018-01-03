
import { put, call, takeLatest } from 'redux-saga/effects';
import { replace } from 'react-router-redux';
import { getFirebase } from 'react-redux-firebase';

import request from '../utils/request';

import { INIT_OAUTH, COMPLETE_OAUTH } from '../containers/App/constants';

function* initOAuth({ source }) {
  try {

    const { redirectURL } = yield call(request, `/api/oauth/${source}`);
    window.location = redirectURL;

  } catch (error) {

    console.log(error)

  }
}

function* completeOAuth({ data: { source, code } }) {
  try {

    yield put(replace('/'));

    const { accessToken, refreshToken } = yield call(request, `/api/oauth/${source}/redirect?code=${code}`);

    yield getFirebase().updateProfile({
      [`oauth/${source}/accessToken`]: accessToken,
      [`oauth/${source}/refreshToken`]: refreshToken,
    });

    // dispatch success noty

  } catch (error) {

    console.log(error);

  }
}

export default function* oauth() {
  yield [
    takeLatest(INIT_OAUTH, initOAuth),
    takeLatest(COMPLETE_OAUTH, completeOAuth)
  ];
}
