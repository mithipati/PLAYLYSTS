
import { isEmpty, isLoaded } from 'react-redux-firebase';

export const withLoader = (main, fallback, loader, auth) => {
  if (isLoaded(auth)) {
    if (isEmpty(auth)) {
      return fallback;
    } else {
      return main;
    }
  } else {
    return loader;
  }
};
