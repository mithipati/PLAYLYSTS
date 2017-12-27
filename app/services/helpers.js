
import {SOUNDCLOUD, YOUTUBE, SPOTIFY, ERROR_INVALID_TRACK, ERROR_NOT_FOUND} from './constants';

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
  let errorMessage = error.message;

  if (errorMessage === 'Not Found') {
    errorMessage = ERROR_NOT_FOUND
  } else if (errorMessage === 'Bad Request') {
    errorMessage = ERROR_INVALID_TRACK;
  }

  return errorMessage;
};

export const _getCurrentDate = () => {
  const today = new Date();
  return `${today.getMonth() + 1} / ${today.getDate()} / ${today.getFullYear()}`;
};
