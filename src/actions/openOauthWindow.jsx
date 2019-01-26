/* eslint-disable no-undef,max-len,import/prefer-default-export */

import { OPEN_WINDOW } from './types';

export const openOauthWindow = () => {
  const width = 600;
  const height = 600;
  const left = window.innerWidth / 2 - width / 2;
  const top = window.innerHeight / 2 - height / 2;
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const state = process.env.REACT_APP_STATE;
  const redirectUri = process.env.REACT_APP_REDIRECT_URI;
  const baseUrl = process.env.REACT_APP_BASEURL;
  const url = `${baseUrl}authorize.compact?client_id=${clientId}&response_type=code&state=${state}&redirect_uri=${redirectUri}&duration=temporary&scope=identity`;
  window.open(
    url,
    'oauth',
    `width=${width}, height=${height}, left=${left}, top=${top}`,
  );
  return {
    type: OPEN_WINDOW,
    payload: true,
  };
};
