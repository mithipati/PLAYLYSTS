
import { ADD_SONG, ADD_SONG_SUCCESS, ADD_SONG_ERROR, REMOVE_SONG, CHANGE_SONG_LINK } from './constants';

export function addSong(url) {
  return {
    type: ADD_SONG,
    url
  }
}

export function addSongSuccess(song) {
  return {
    type: ADD_SONG_SUCCESS,
    song,
  }
}

export function addSongError() {
  return {
    type: ADD_SONG_ERROR,
  }
}

export function removeSong(song) {
  return {
    type: REMOVE_SONG,
    song,
  };
}

export function changeSongLink(url) {
  return {
    type: CHANGE_SONG_LINK,
    url,
  }
}
