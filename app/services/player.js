
import { put, takeLatest } from 'redux-saga/effects';

import { playTrackSuccess, pauseTrackSuccess } from '../containers/Player/actions';
import { PLAY_TRACK, PAUSE_TRACK } from '../containers/Player/constants';

function* playTrack({ track }) {
  try {

    yield put(playTrackSuccess(track));

  } catch (error) {

    // TODO: display error notification
    console.log(error);

  }
}

function* pauseTrack() {
  try {

    yield put(pauseTrackSuccess());

  } catch (error) {

    // TODO: display error notification
    console.log(error);

  }
}

export default function* play() {
  yield [
    takeLatest(PLAY_TRACK, playTrack),
    takeLatest(PAUSE_TRACK, pauseTrack),
  ];
}
