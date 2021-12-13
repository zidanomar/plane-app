import { GET_ERRORS, CLEAR_ERRORS } from '../../constant/actionType';

const initialState = {
  message: null,
  status: null,
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        message: action.payload.message,
        status: action.payload.status,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        message: null,
        status: null,
      };
    default:
      return state;
  }
};

export default errorReducer;
