import axios from 'axios';
import {
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAIL,
} from './types';

const receiveComments = id => dispatch => {
  dispatch({
    type: GET_COMMENTS_REQUEST,
    payload: { isLoading: true, error: false },
  });
  axios
    .get(`https://www.reddit.com/comments/${id}.json`)
    .then(response => {
      dispatch({
        type: GET_COMMENTS_SUCCESS,
        payload: {
          data: response.data[0].data.children[0].data,
          dataNews: response.data[1].data.children,
          isLoading: false,
          error: false,
        },
      });
    })
    .catch(() =>
      dispatch({
        type: GET_COMMENTS_FAIL,
        payload: { isLoading: false, error: true },
      }),
    );
};

export default receiveComments;
