
import { put, takeLatest } from 'redux-saga/effects';

import { playTrack, pauseTrack, loadTrack, nextTrack, prevTrack, stopTrack } from '../containers/Player/actions';
import { LOAD_TRACK_REQUEST, NEXT_TRACK_REQUEST, PREV_TRACK_REQUEST } from '../containers/Player/constants';

function* load({ trackIndex }) {
  try {

    yield put(pauseTrack());
    yield put(loadTrack(trackIndex));
    yield put(playTrack());

  } catch (error) {

    // TODO: display error notification
    console.log(error);

  }
}

function* next({ data: { currentPlaylistCount, currentTrackIndex } }) {
  try {

    yield put(pauseTrack());

    if (currentTrackIndex + 1 >= currentPlaylistCount) {
      yield put(stopTrack());
    } else {
      yield put(nextTrack());
      yield put(loadTrack());
      yield put(playTrack());
    }

  } catch (error) {

    // TODO: display error notification
    console.log(error);

  }
}

function* prev({ data: { currentTrackIndex } }) {
  try {

    yield put(pauseTrack());

    if (currentTrackIndex - 1 < 0) {
      yield put(stopTrack());
    } else {
      yield put(prevTrack());
      yield put(loadTrack());
      yield put(playTrack());
    }

  } catch (error) {

    // TODO: display error notification
    console.log(error);

  }
}

export default function* play() {
  yield [
    takeLatest(LOAD_TRACK_REQUEST, load),
    takeLatest(NEXT_TRACK_REQUEST, next),
    takeLatest(PREV_TRACK_REQUEST, prev),
  ];
}
