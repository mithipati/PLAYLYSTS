
import {
  PLAY_TRACK,
  PAUSE_TRACK,
  LOAD_TRACK,
  LOAD_TRACK_REQUEST,
  NEXT_TRACK,
  NEXT_TRACK_REQUEST,
  PREV_TRACK,
  PREV_TRACK_REQUEST,
  STOP_TRACK,
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

export function loadTrack(trackIndex) {
  return {
    type: LOAD_TRACK,
    trackIndex
  };
}

export function loadTrackRequest(trackIndex) {
  return {
    type: LOAD_TRACK_REQUEST,
    trackIndex
  };
}

export function nextTrack() {
  return {
    type: NEXT_TRACK,
  };
}

export function nextTrackRequest(currentPlaylistCount, currentTrackIndex) {
  return {
    type: NEXT_TRACK_REQUEST,
    data: {
      currentPlaylistCount,
      currentTrackIndex
    }
  };
}

export function prevTrack() {
  return {
    type: PREV_TRACK,
  };
}

export function prevTrackRequest(currentTrackIndex) {
  return {
    type: PREV_TRACK_REQUEST,
    data: {
      currentTrackIndex
    }
  };
}

export function stopTrack() {
  return {
    type: STOP_TRACK,
  };
}
