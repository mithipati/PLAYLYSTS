
import { SOUNDCLOUD, YOUTUBE } from './constants';

export const _getTrackSource = (trackURL) => {
  if (trackURL.match(/soundcloud/i)) {
    return SOUNDCLOUD;
  } else if (trackURL.match(/youtu/i)) {
    return YOUTUBE;
  } else {
    return null;
  }
};

export const _getCurrentDate = () => {
  const today = new Date();
  return `${today.getMonth() + 1} / ${today.getDate()} / ${today.getFullYear()}`;
};
