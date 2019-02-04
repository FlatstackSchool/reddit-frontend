import { combineReducers } from 'redux';
import oauthWindow from './oauthWindow';

export default combineReducers({
  oauth: oauthWindow,
});
