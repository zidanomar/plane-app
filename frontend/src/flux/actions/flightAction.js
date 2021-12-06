import * as api from '../../api';
import {
  ADD_FLIGHT,
  DELETE_FLIGHT,
  FETCHED_FLIGHTS,
  FETCHING_FLIGHTS,
  GET_ERRORS,
  UPDATE_FLIGHT,
} from '../../constant/actionType';
import { returnErrors } from './errorAction';

export const getAllFlight = () => async (dispatch) => {
  try {
    dispatch({ type: FETCHING_FLIGHTS });

    const flights = await api.getAllFlights();

    return dispatch({ type: FETCHED_FLIGHTS, payload: flights.data });
  } catch (error) {
    dispatch(returnErrors('error', 500));
    dispatch({ type: GET_ERRORS });
  }
};

export const addNewFlight = (newFlightData) => async (dispatch) => {
  try {
    dispatch({ type: FETCHING_FLIGHTS });

    const newPlane = await api.addNewFlight(newFlightData);

    return dispatch({ type: ADD_FLIGHT, payload: newPlane.data });
  } catch (error) {
    dispatch(returnErrors('error', 500));
    dispatch({ type: GET_ERRORS });
  }
};

export const updateFlight = (planeId, newPlaneData) => async (dispatch) => {
  try {
    dispatch({ type: FETCHING_FLIGHTS });

    const updatedFlight = await api.updateFlight(planeId, newPlaneData);

    dispatch({ type: UPDATE_FLIGHT, payload: updatedFlight.data });
  } catch (error) {
    dispatch(returnErrors('error', 500));
    dispatch({ type: GET_ERRORS });
  }
};

export const deleteFlight = (flightId) => async (dispatch) => {
  try {
    dispatch({ type: FETCHING_FLIGHTS });

    const deletedFlight = await api.deleteFlight(flightId);

    dispatch({ type: DELETE_FLIGHT, payload: deletedFlight.data });
  } catch (error) {
    dispatch(returnErrors('error', 500));
    dispatch({ type: GET_ERRORS });
  }
};
