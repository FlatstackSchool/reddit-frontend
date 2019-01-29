import {
  OPEN_WINDOW,
  CLOSE_WINDOW,
  CHECK_WINDOW,
  GENERATE_STATE,
} from '../actions/types';

const initialState = {
  isOpen: false,
  randomString: '',
};

export default function oauthWindow(state = initialState, action) {
  switch (action.type) {
    case OPEN_WINDOW:
      return {
        ...state,
        isOpen: action.payload.isOpen,
      };
    case CLOSE_WINDOW:
      return {
        ...state,
        isOpen: action.payload.isOpen,
      };
    case CHECK_WINDOW:
      return {
        ...state,
      };
    case GENERATE_STATE:
      return {
        ...state,
        randomString: action.generatedString,
      };
    default:
      return state;
  }
}
