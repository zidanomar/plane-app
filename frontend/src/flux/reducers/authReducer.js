import {
  FETCHING_USER,
  FETCHING_USER_FAILED,
  LOGIN,
} from '../../constant/actionType';

const initialState = {
  credential: {
    email: '',
    exp: 0,
    iat: 0,
    name: '',
    role: '',
    username: '',
    uuid: '',
  },
  isLoading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_USER:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN:
      return {
        ...state,
        isLoading: false,
        credential: action.payload,
      };
    case FETCHING_USER_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
