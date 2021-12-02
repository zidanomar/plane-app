// import constant here

import { FETCHED_PLANE, FETCHING_PLANE } from '../../constant/actionType';

const initialState = {
  isLoading: false,
  planes: [],
};

const planeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHED_PLANE:
      return {
        ...state,
        isLoading: false,
        planes: action.payload,
      };
    case FETCHING_PLANE:
      return {
        ...state,
        isLoading: true,
      };

    default:
      return state;
  }
};

export default planeReducer;
