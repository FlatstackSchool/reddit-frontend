/* eslint-disable import/prefer-default-export */
import { CHECK_WINDOW } from './types';
import { closeOauthWindow } from './closeOauthWindow';

export const checkOauthWindow = window => dispatch => {
  setInterval(() => {
    try {
      if (window.location.pathname.indexOf('callback') >= 0) {
        dispatch(closeOauthWindow(window));
      }
    } catch (e) {
      console.log(e);
    }
  }, 2000);
  return {
    type: CHECK_WINDOW,
  };
};
