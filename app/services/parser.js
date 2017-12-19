
import { put, call, takeLatest } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { startSubmit, stopSubmit, reset } from 'redux-form/immutable';
import parse from 'url-parse';

import request from '../utils/request';
import { SOUNDCLOUD_CLIENT_ID, GOOGLE_API_KEY } from '../secret';

import { _getTrackSource, _getCurrentDate } from './helpers';
import { SOUNDCLOUD, YOUTUBE, INVALID_TRACK, NOT_FOUND } from './constants';
import { ADD_TRACK } from '../containers/Library/constants';
import { addTrackSuccess } from '../containers/Library/actions';

function* getSoundCloudTrack(trackURL) {
  try {

    const requestURL = `http://api.soundcloud.com/resolve?url=${trackURL}&client_id=${SOUNDCLOUD_CLIENT_ID}`;
    const trackData = yield call(request, requestURL);

    if (trackData.kind !== 'track') {
      yield put(stopSubmit('track', { track: INVALID_TRACK }));
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
      errorMessage = NOT_FOUND
    }

    yield put(stopSubmit('track', { track: errorMessage }));

  }
}

function* getYouTubeTrack(trackURL) {
  try {

    const parsedURL = parse(trackURL, true);
    if (!parsedURL.query.hasOwnProperty('v')) {
      yield put(stopSubmit('track', { track: INVALID_TRACK }));
      return false;
    }

    const videoID = parsedURL.query.v;
    const requestURL = 'https://www.googleapis.com/youtube/v3/videos?' +
      `part=snippet%2CcontentDetails&id=${videoID}&key=${GOOGLE_API_KEY}`;
    let trackData = yield call(request, requestURL);
    trackData = trackData.items[0];

    if (trackData.kind !== 'youtube#video') {
      yield put(stopSubmit('track', { track: INVALID_TRACK }));
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

    yield put(stopSubmit('track', { track: error.message }));

  }
}

function* getTrack({ trackURL }) {
  yield put(startSubmit('track'));

  const trackSource = _getTrackSource(trackURL);

  switch (trackSource) {
    case SOUNDCLOUD:
      return yield getSoundCloudTrack(trackURL);
    case YOUTUBE:
      return yield getYouTubeTrack(trackURL);
    default:
      return yield put(stopSubmit('track', { track: NOT_FOUND }));
  }
}

export default function* parseURL() {
  yield takeLatest(ADD_TRACK, getTrack);
}
