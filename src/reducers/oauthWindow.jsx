import { OPEN_WINDOW, CLOSE_WINDOW } from '../actions/types';

const initialState = {
  open: false,
};

export default function oauthWindow(state = initialState, action) {
  switch (action) {
    case action.type === OPEN_WINDOW:
      return {
        ...state,
        open: action.payload,
      };
    case action.type === CLOSE_WINDOW:
      return {
        ...state,
        open: action.payload,
      };
    default:
      return state;
  }
}
