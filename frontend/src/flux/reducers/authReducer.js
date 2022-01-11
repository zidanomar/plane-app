import {
  FETCHING_USER,
  FETCHING_USER_FAILED,
  LOGIN,
  LOGOUT,
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

const resetState = {
  credential: {
    email: '',
    exp: 0,
    iat: 0,
    name: '',
    role: '',
    username: '',
    uuid: '',
    companyUUID: null,
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
    case LOGOUT:
      return {
        ...resetState,
      };
    case FETCHING_USER_FAILED:
      return {
        ...resetState,
      };
    default:
      return state;
  }
};

export default authReducer;
