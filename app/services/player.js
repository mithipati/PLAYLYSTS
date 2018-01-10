
import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { PLAY_TRACK, PLAY_TRACK_SUCCESS, PAUSE_TRACK, PAUSE_TRACK_SUCCESS } from '../containers/Player/constants';

function* playTrack({ track }) {
  try {


  } catch (error) {

    // TODO: display error notification
    console.log(error);

  }
}

function* pauseTrack() {
  try {


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
