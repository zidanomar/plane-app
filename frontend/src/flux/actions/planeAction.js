import * as api from '../../api';
import {
  ADD_PLANE,
  DELETE_PLANE,
  FETCHED_PLANE,
  FETCHING_PLANE,
  FETCHING_PLANE_FAILED,
  UPDATE_PLANE,
} from '../../constant/actionType';
import { returnErrors } from './errorAction';

export const getAllPlane = () => async (dispatch) => {
  try {
    dispatch({ type: FETCHING_PLANE });

    const fetchAllPlane = await api.getAllPlanes();
    return dispatch({ type: FETCHED_PLANE, payload: fetchAllPlane.data });
  } catch (error) {
    dispatch(
      returnErrors(error.response.data.status, error.response.data.message)
    );
    dispatch({ type: FETCHING_PLANE_FAILED });
  }
};

export const addNewPlane = (newPlaneData) => async (dispatch) => {
  try {
    dispatch({ type: FETCHING_PLANE });

    const newPlane = await api.addNewPlane(newPlaneData);

    return dispatch({ type: ADD_PLANE, payload: newPlane.data });
  } catch (error) {
    dispatch(
      returnErrors(error.response.data.status, error.response.data.message)
    );
    dispatch({ type: FETCHING_PLANE_FAILED });
  }
};

export const updatePlane = (planeId, newPlaneData) => async (dispatch) => {
  try {
    dispatch({ type: FETCHING_PLANE });

    const updatedPlane = await api.updatePlane(planeId, newPlaneData);

    return dispatch({ type: UPDATE_PLANE, payload: updatedPlane.data });
  } catch (error) {
    dispatch(
      returnErrors(error.response.data.status, error.response.data.message)
    );
    dispatch({ type: FETCHING_PLANE_FAILED });
  }
};

export const deletePlaneAction = (planeId) => async (dispatch) => {
  try {
    dispatch({ type: FETCHING_PLANE });

    const deletedPlane = await api.deletePlane(planeId);

    return dispatch({ type: DELETE_PLANE, payload: deletedPlane.data });
  } catch (error) {
    dispatch(
      returnErrors(error.response.data.status, error.response.data.message)
    );
    dispatch({ type: FETCHING_PLANE_FAILED });
  }
};
