import {
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAIL,
} from '../actions/types';

const initialState = {
  data: [],
  dataNews: [],
  isLoading: false,
  error: false,
};

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENTS_REQUEST:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        error: action.payload.error,
      };
    case GET_COMMENTS_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        dataNews: action.payload.dataNews,
        isLoading: action.payload.isLoading,
        error: action.payload.error,
      };
    case GET_COMMENTS_FAIL:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default commentsReducer;
