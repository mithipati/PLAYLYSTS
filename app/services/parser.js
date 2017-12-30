
import { put, call, takeLatest } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { startSubmit, stopSubmit, reset } from 'redux-form/immutable';

import request from '../utils/request';
import { _getTrackSource, _getErrorMessage, _getCurrentDate } from './helpers';
import { SOUNDCLOUD, YOUTUBE, SPOTIFY, ERROR_INVALID_TRACK, ERROR_NOT_FOUND, ERROR_CONNECT_SPOTIFY } from './constants';
import { ADD_TRACK } from '../containers/Library/constants';
import { addTrackSuccess } from '../containers/Library/actions';

function* getSoundCloudTrack(trackURL) {
  try {

    const requestURL = `/api/parse/soundcloud?trackURL=${trackURL}`;
    const response = yield call(request, requestURL);
    const trackData = response.data;

    if (trackData.kind !== 'track') {
      yield put(stopSubmit('track', { track: ERROR_INVALID_TRACK }));
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

    yield put(stopSubmit('track', { track: _getErrorMessage(error) }));

  }
}

function* getYouTubeTrack(trackURL) {
  try {

    const requestURL = `/api/parse/youtube?trackURL=${trackURL}`;
    const response = yield call(request, requestURL);
    const trackData = response.data;

    if (trackData.kind !== 'youtube#video') {
      yield put(stopSubmit('track', { track: ERROR_INVALID_TRACK }));
      return false;
    }

    const track = fromJS({
      id: Math.random(),
      title: trackData.snippet.title,
      artist: trackData.snippet.channelTitle,
      source: 'YouTube',
      created_at: _getCurrentDate(),
    });
    yield put(addTrackSuccess(track));
    yield put(reset('track'));

  } catch (error) {

    yield put(stopSubmit('track', { track: _getErrorMessage(error) }));

  }
}

function* getSpotifyTrack(trackURL) {

    yield put(stopSubmit('track', { track: ERROR_CONNECT_SPOTIFY }));
}

function* getTrack({ trackURL }) {
  yield put(startSubmit('track'));

  const trackSource = _getTrackSource(trackURL);

  switch (trackSource) {
    case SOUNDCLOUD:
      return yield getSoundCloudTrack(trackURL);
    case YOUTUBE:
      return yield getYouTubeTrack(trackURL);
    case SPOTIFY:
      return yield getSpotifyTrack(trackURL);
    default:
      return yield put(stopSubmit('track', { track: ERROR_NOT_FOUND }));
  }
}

export default function* parse() {
  yield takeLatest(ADD_TRACK, getTrack);
}
