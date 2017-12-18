
import { ADD_TRACK, ADD_TRACK_SUCCESS, ADD_TRACK_ERROR, REMOVE_TRACK } from './constants';

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

export function addTrackError(message) {
  return {
    type: ADD_TRACK_ERROR,
    message
  }
}

export function removeTrack(track) {
  return {
    type: REMOVE_TRACK,
    track,
  };
}
