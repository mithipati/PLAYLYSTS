
import { put, call, takeLatest } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { startSubmit, stopSubmit, reset } from 'redux-form/immutable';
import axios from 'axios';

import {
  _getTrackSource,
  _getErrorMessage,
  _getCurrentUser,
  _isUserAuthorizedWithSpotify,
  _getCurrentDate
} from './helpers';
import { SOUNDCLOUD, YOUTUBE, SPOTIFY, ERROR_INVALID_TRACK, ERROR_NOT_FOUND, ERROR_SPOTIFY_CONNECT } from './constants';
import { ADD_TRACK } from '../containers/Library/constants';
import { addTrackSuccess } from '../containers/Library/actions';

function* getSoundCloudTrack(trackURL) {
  try {

    const response = yield call(axios, `/api/parse/soundcloud?trackURL=${trackURL}`);
    const trackData = response.data.track;

    if (trackData.kind !== 'track') {
      yield put(stopSubmit('track', { track: ERROR_INVALID_TRACK }));
      return false;
    }

    const track = fromJS({
      id: Math.random(),
      title: trackData.title,
      artist: trackData.user.username,
      source: 'SoundCloud',
      duration: 0,
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

    const response = yield call(axios, `/api/parse/youtube?trackURL=${trackURL}`);
    const trackData = response.data.track;

    if (trackData.kind !== 'youtube#video') {
      yield put(stopSubmit('track', { track: ERROR_INVALID_TRACK }));
      return false;
    }

    const track = fromJS({
      id: Math.random(),
      title: trackData.snippet.title,
      artist: trackData.snippet.channelTitle,
      source: 'YouTube',
      duration: 0,
      created_at: _getCurrentDate(),
    });
    yield put(addTrackSuccess(track));
    yield put(reset('track'));

  } catch (error) {

    yield put(stopSubmit('track', { track: _getErrorMessage(error) }));

  }
}

function* getSpotifyTrack(trackURL) {

    const user = yield _getCurrentUser();
    if (!_isUserAuthorizedWithSpotify(user)) {
      yield put(stopSubmit('track', { track: ERROR_SPOTIFY_CONNECT }));
      return false;
    }
    const accessToken = user.oauth.spotify.accessToken;
    const refreshToken = user.oauth.spotify.refreshToken;

    try {

      const response = yield call(
        axios,
        {
          url: '/api/parse/spotify',
          headers: {
            'X-Spotify-Access-Token': accessToken,
            'X-Spotify-Refresh-Token': refreshToken,
          },
          params: {
            trackURL
          }
        }
      );
      const trackData = response.data.track;

      if (trackData.type !== 'track') {
        yield put(stopSubmit('track', { track: ERROR_INVALID_TRACK }));
        return false;
      }

      const track = fromJS({
        id: Math.random(),
        title: trackData.name,
        artist: trackData.artists[0].name,
        source: 'Spotify',
        duration: trackData.duration_ms,
        created_at: _getCurrentDate(),
      });
      yield put(addTrackSuccess(track));
      yield put(reset('track'));

    } catch (error) {

      yield put(stopSubmit('track', { track: _getErrorMessage(error) }));

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
    case SPOTIFY:
      return yield getSpotifyTrack(trackURL);
    default:
      return yield put(stopSubmit('track', { track: ERROR_NOT_FOUND }));
  }
}

export default function* parse() {
  yield takeLatest(ADD_TRACK, getTrack);
}
