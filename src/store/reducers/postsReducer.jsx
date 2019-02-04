import {
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAIL,
} from '../actions/types';

const initialState = {
  data: [],
  isLoading: false,
  error: false,
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS_REQUEST:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        error: action.payload.error,
      };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        isLoading: action.payload.isLoading,
        error: action.payload.error,
      };
    case GET_POSTS_FAIL:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default postsReducer;
