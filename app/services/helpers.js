
import { getFirebase } from 'react-redux-firebase';
import {
  SOUNDCLOUD,
  YOUTUBE,
  SPOTIFY,
  NOT_FOUND,
  BAD_REQUEST,
  UNAUTHORIZED,
  ERROR_INVALID_TRACK,
  ERROR_NOT_FOUND,
  ERROR_SPOTIFY_CONNECT,
} from './constants';

export const _getTrackSource = (trackURL) => {
  if (trackURL.match(/soundcloud/i)) {
    return SOUNDCLOUD;
  } else if (trackURL.match(/youtu/i)) {
    return YOUTUBE;
  } else if (trackURL.match(/(spotify)(.*?)(track)/i)) {
    return SPOTIFY;
  } else {
    return null;
  }
};

export const _getErrorMessage = (error) => {
  const errorMessage = error.message;

  switch (errorMessage) {
    case NOT_FOUND:
      return ERROR_NOT_FOUND;
    case BAD_REQUEST:
      return ERROR_INVALID_TRACK;
    case UNAUTHORIZED:
      return ERROR_SPOTIFY_CONNECT;
    default:
      return ERROR_INVALID_TRACK;
  }
};

export const _getCurrentUser = () => {
  const userID = getFirebase().auth().currentUser.uid;
  return getFirebase().database().ref(`/users/${userID}`).once('value').then(snapshot => snapshot.val());
};

export const _isUserAuthorizedWithSpotify = (user) => {
  return user.oauth && user.oauth.spotify && user.oauth.spotify.accessToken;
};

export const _getCurrentDate = () => {
  const today = new Date();
  return `${today.getMonth() + 1} / ${today.getDate()} / ${today.getFullYear()}`;
};
