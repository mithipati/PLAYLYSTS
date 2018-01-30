
import { put, takeLatest } from 'redux-saga/effects';

import { playTrack, pauseTrack} from '../containers/Player/actions';
import { LOAD_TRACK } from '../containers/Player/constants';

function* loadTrack() {
  try {

    yield put(pauseTrack());
    yield put(playTrack());

  } catch (error) {

    // TODO: display error notification
    console.log(error);

  }
}

export default function* play() {
  yield takeLatest(LOAD_TRACK, loadTrack);
}
