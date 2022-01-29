// import constant here

import {
  ADD_PLANE,
  DELETE_MANY_PLANES,
  DELETE_PLANE,
  FETCHED_PLANE,
  FETCHING_PLANE,
  FETCHING_PLANE_FAILED,
  GET_PLANE_DETAIL,
  POSTING_LIKE,
  POSTING_LIKE_FAILED,
  POST_LIKE,
  UPDATE_PLANE,
} from '../../constant/actionType';

const initialState = {
  isLoading: false,
  planes: [],
  planeDetail: {},
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
    case POSTING_LIKE:
      return {
        ...state,
        isLoading: true,
      };
    case GET_PLANE_DETAIL:
      return {
        ...state,
        planeDetail: action.payload,
        isLoading: false,
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
    case POST_LIKE:
      let likedPlane = [...state.planes, action.payload.plane];
      const likedPlaneIndex = state.planes.findIndex(
        (x) => x.uuid === action.payload.plane.uuid
      );

      likedPlane[likedPlaneIndex] = action.payload.plane;
      return {
        ...state,
        isLoading: false,
        planes: likedPlane,
        planeDetail: {
          ...state.planeDetail,
          likedBy: action.payload.plane.likedBy,
        },
      };
    case DELETE_PLANE:
      const currentPlane = state.planes.filter(
        (x) => x.uuid !== action.payload
      );

      return {
        ...state,
        isLoading: false,
        planes: currentPlane,
      };
    case DELETE_MANY_PLANES:
      const currentPlanes = state.planes.filter(
        (x) => !action.payload.includes(x.uuid)
      );
      return {
        ...state,
        isLoading: false,
        planes: currentPlanes,
      };
    case FETCHING_PLANE_FAILED:
    case POSTING_LIKE_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default planeReducer;
