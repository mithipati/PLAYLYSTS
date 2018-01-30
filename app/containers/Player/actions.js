
import {
  PLAY_TRACK,
  PAUSE_TRACK,
  LOAD_TRACK,
} from './constants';

export function playTrack() {
  return {
    type: PLAY_TRACK
  };
}

export function pauseTrack() {
  return {
    type: PAUSE_TRACK
  };
}

export function loadTrack(track) {
  return {
    type: LOAD_TRACK,
    track
  };
}
