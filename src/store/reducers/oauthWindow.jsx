import { OPEN_WINDOW, CLOSE_WINDOW, CHECK_WINDOW } from '../actions/types';

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
        randomString: action.payload.randomState,
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
    default:
      return state;
  }
}
