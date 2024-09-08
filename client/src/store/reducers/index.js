import { combineReducers } from 'redux';
import alertSlice from '../slices/alertSlice'
import authSlice from '../slices/authSlice'
import postSlice from '../slices/postSlice'
import profileSlice from '../slices/profileSlice'

import profile from './profile';
import post from './post';

export default combineReducers({
  alert: alertSlice ,
  auth  : authSlice ,
  post : postSlice,
  profile : profileSlice
});


