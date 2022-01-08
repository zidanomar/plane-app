import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import planeReducer from './planeReducer';
import customerReducer from './customerReducer';
import flightReducer from './flightReducer';
import authReducer from './authReducer';

const globalReducer = combineReducers({
  plane: planeReducer,
  error: errorReducer,
  customer: customerReducer,
  flight: flightReducer,
  userCredential: authReducer,
});

export default globalReducer;
