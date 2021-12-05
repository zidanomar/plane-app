import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import planeReducer from './planeReducer';
import customerReducer from './customerReducer';

const globalReducer = combineReducers({
  plane: planeReducer,
  error: errorReducer,
  customer: customerReducer,
});

export default globalReducer;
