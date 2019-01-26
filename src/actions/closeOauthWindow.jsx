/* eslint-disable import/prefer-default-export */
import { CLOSE_WINDOW } from './types';

export const closeOauthWindow = () => {
  try {
    if (window.location.pathname.indexOf('callback') >= 0) {
      window.opener.location.href = window.location.href;
      window.close();
    }
  } catch (e) {
    console.log(e);
  }
  return {
    type: CLOSE_WINDOW,
    payload: false,
  };
};
