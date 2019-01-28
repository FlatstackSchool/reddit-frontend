/* eslint-disable import/prefer-default-export,no-param-reassign */
import { CLOSE_WINDOW } from './types';

export const closeOauthWindow = window => {
  window.opener.location.href = window.location.href;
  window.close();

  return {
    type: CLOSE_WINDOW,
    payload: { isOpen: false },
  };
};
