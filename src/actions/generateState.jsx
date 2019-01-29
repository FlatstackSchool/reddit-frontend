/* eslint-disable import/prefer-default-export */
import { GENERATE_STATE } from './types';

export const generateState = () => {
  const string =
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15);
  return {
    type: GENERATE_STATE,
    generatedString: string,
  };
};
