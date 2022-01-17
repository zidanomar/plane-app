import * as api from '../../api';
import {
  ADD_FLIGHT,
  DELETE_FLIGHT,
  FETCHED_FLIGHTS,
  FETCHING_FLIGHTS,
  UPDATE_FLIGHT,
  FETCHING_FLIGHT_FAILED,
  DELETE_MANY_FLIGHTS,
  GET_FLIGHT_DETAIL,
} from '../../constant/actionType';
import { returnErrors } from './errorAction';

export const getAllFlight = () => async (dispatch) => {
  try {
    dispatch({ type: FETCHING_FLIGHTS });

    const flights = await api.getAllFlights();

    return dispatch({ type: FETCHED_FLIGHTS, payload: flights.data });
  } catch (error) {
    dispatch(
      returnErrors(error.response.data.status, error.response.data.message)
    );
    dispatch({ type: FETCHING_FLIGHT_FAILED });
  }
};

export const getFlightById = (flightId) => async (dispatch) => {
  try {
    dispatch({ type: FETCHING_FLIGHTS });

    const { data } = await api.getFlightById(flightId);
    dispatch({ type: GET_FLIGHT_DETAIL, payload: data });
  } catch (error) {
    dispatch(
      returnErrors(error.response.data.status, error.response.data.message)
    );
    dispatch({ type: FETCHING_FLIGHT_FAILED });
  }
};

export const addNewFlight = (newFlightData) => async (dispatch) => {
  try {
    dispatch({ type: FETCHING_FLIGHTS });

    const newPlane = await api.addNewFlight(newFlightData);

    return dispatch({ type: ADD_FLIGHT, payload: newPlane.data });
  } catch (error) {
    dispatch(
      returnErrors(error.response.data.status, error.response.data.message)
    );
    dispatch({ type: FETCHING_FLIGHT_FAILED });
  }
};

export const updateFlight = (planeId, newPlaneData) => async (dispatch) => {
  try {
    dispatch({ type: FETCHING_FLIGHTS });

    const updatedFlight = await api.updateFlight(planeId, newPlaneData);

    dispatch({ type: UPDATE_FLIGHT, payload: updatedFlight.data });
  } catch (error) {
    dispatch(
      returnErrors(error.response.data.status, error.response.data.message)
    );
    dispatch({ type: FETCHING_FLIGHT_FAILED });
  }
};

export const deleteFlight = (flightId) => async (dispatch) => {
  try {
    dispatch({ type: FETCHING_FLIGHTS });

    const deletedFlight = await api.deleteFlight(flightId);

    dispatch({ type: DELETE_FLIGHT, payload: deletedFlight.data });
  } catch (error) {
    dispatch(
      returnErrors(error.response.data.status, error.response.data.message)
    );
    dispatch({ type: FETCHING_FLIGHT_FAILED });
  }
};

export const deleteManyFlights = (selectedItems) => async (dispatch) => {
  const uuids = { selectedItems };
  try {
    dispatch({ type: FETCHING_FLIGHTS });

    await api.deleteManyFlights(uuids);

    dispatch({ type: DELETE_MANY_FLIGHTS, payload: selectedItems });
  } catch (error) {
    dispatch(
      returnErrors(error.response.data.status, error.response.data.message)
    );
    dispatch({ type: FETCHING_FLIGHT_FAILED });
  }
};
