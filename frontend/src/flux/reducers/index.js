import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import planeReducer from './planeReducer';

const globalReducer = combineReducers({
  plane: planeReducer,
  error: errorReducer,
});

export default globalReducer;
