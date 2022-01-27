import {
  FETCHED_USER,
  FETCHED_USER_ID,
  GET_USER,
  GET_USER_FAILED,
} from '../../constant/actionType';

const initialState = {
  users: [],
  userDetail: {},
  isLoading: false,
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        isLoading: true,
      };
    case GET_USER_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case FETCHED_USER:
      return {
        ...state,
        users: action.payload,
        isLoading: false,
      };
    case FETCHED_USER_ID:
      return {
        ...state,
        isLoading: false,
        userDetail: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
