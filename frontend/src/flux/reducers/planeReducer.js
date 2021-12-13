// import constant here

import {
  ADD_PLANE,
  DELETE_PLANE,
  FETCHED_PLANE,
  FETCHING_PLANE,
  FETCHING_PLANE_FAILED,
  UPDATE_PLANE,
} from '../../constant/actionType';

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
    case ADD_PLANE:
      return {
        ...state,
        isLoading: false,
        planes: [...state.planes, action.payload],
      };
    case UPDATE_PLANE:
      let updatedItems = state.planes;
      const index = state.planes.findIndex(
        (x) => x.uuid === action.payload.uuid
      );

      updatedItems[index] = action.payload;

      return {
        ...state,
        isLoading: false,
        planes: updatedItems,
      };
    case DELETE_PLANE:
      const currentPlanes = state.planes.filter(
        (x) => x.uuid !== action.payload
      );

      return {
        ...state,
        isLoading: false,
        planes: currentPlanes,
      };
    case FETCHING_PLANE_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default planeReducer;
