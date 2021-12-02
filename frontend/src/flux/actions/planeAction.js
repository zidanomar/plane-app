import * as api from '../../api';
import { FETCHED_PLANE, FETCHING_PLANE } from '../../constant/actionType';
import { returnErrors } from './errorAction';

export const getAllPlane = () => async (dispatch) => {
  try {
    dispatch({ type: FETCHING_PLANE });

    const fetchAllPlane = await api.getAllPlanes();
    return dispatch({ type: FETCHED_PLANE, payload: fetchAllPlane.data });
  } catch (error) {
    dispatch(returnErrors(error.response.data.msg, error.response.status));
    dispatch({ type: FETCHED_PLANE, payload: [] });
  }
};
