
import {fromJS} from "immutable";

const initialState = fromJS({
});

function playlistReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default playlistReducer;
