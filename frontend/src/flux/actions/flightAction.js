import * as api from '../../api';
import {
  FETCHED_FLIGHTS,
  FETCHED_PLANE,
  FETCHING_FLIGHTS,
} from '../../constant/actionType';
import { returnErrors } from './errorAction';

export const getAllFlight = () => async (dispatch) => {
  try {
    dispatch({ type: FETCHING_FLIGHTS });

    const flights = await api.getAllFlights();
    return dispatch({ type: FETCHED_FLIGHTS, payload: flights.data });
  } catch (error) {
    dispatch(returnErrors(error.data.status, error.data.message));
    dispatch({ type: FETCHED_PLANE, payload: [] });
  }
};
