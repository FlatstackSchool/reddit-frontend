import axios from 'axios';
import { GET_POSTS_REQUEST, GET_POSTS_SUCCESS, GET_POSTS_FAIL } from './types';

const receivePosts = () => dispatch => {
  dispatch({
    type: GET_POSTS_REQUEST,
    payload: { isLoading: true, error: false },
  });
  axios
    .get('https://www.reddit.com/hot.json')
    .then(response => {
      dispatch({
        type: GET_POSTS_SUCCESS,
        payload: {
          data: response.data.data.children,
          isLoading: false,
          error: false,
        },
      });
    })
    .catch(() =>
      dispatch({
        type: GET_POSTS_FAIL,
        payload: { isLoading: false, error: true },
      }),
    );
};

export default receivePosts;
