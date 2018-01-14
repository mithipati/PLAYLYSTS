
import {PLAY_TRACK, PLAY_TRACK_SUCCESS, PAUSE_TRACK, PAUSE_TRACK_SUCCESS } from './constants';

export function playTrack(track) {
  return {
    type: PLAY_TRACK,
    track
  };
}

export function playTrackSuccess(track) {
  return {
    type: PLAY_TRACK_SUCCESS,
    track
  }
}

export function pauseTrack() {
  return {
    type: PAUSE_TRACK
  };
}

export function pauseTrackSuccess() {
  return {
    type: PAUSE_TRACK_SUCCESS
  };
}
