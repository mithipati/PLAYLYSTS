
import { INIT_OAUTH, COMPLETE_OAUTH } from './constants';

export function initOAuth(source) {
  return {
    type: INIT_OAUTH,
    source
  };
}

export function completeOAuth(source, code) {
  return {
    type: COMPLETE_OAUTH,
    data: {
      source,
      code
    }
  }
}
