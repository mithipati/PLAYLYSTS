
import { ADD_TRACK, ADD_TRACK_SUCCESS, REMOVE_TRACK } from './constants';

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

export function removeTrack(track) {
  return {
    type: REMOVE_TRACK,
    track,
  };
}
