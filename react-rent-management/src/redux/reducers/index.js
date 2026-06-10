/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

import auth from './auth';
import apartment from './apartment';
import user from './user';
import global from './global';

export default () => combineReducers({
  auth,
  apartment,
  user,
  global,
});
