
import { ADD_TRACK, ADD_TRACK_SUCCESS, ADD_TRACK_ERROR, REMOVE_TRACK, CHANGE_TRACK_URL } from './constants';

export function addTrack(trackURL) {
  return {
    type: ADD_TRACK,
    trackURL
  }
}

export function addTrackSuccess(track) {
  return {
    type: ADD_TRACK_SUCCESS,
    track,
  }
}

export function addTrackError() {
  return {
    type: ADD_TRACK_ERROR,
  }
}

export function removeTrack(track) {
  return {
    type: REMOVE_TRACK,
    track,
  };
}

export function changeTrackURL(trackURL) {
  return {
    type: CHANGE_TRACK_URL,
    trackURL,
  }
}
