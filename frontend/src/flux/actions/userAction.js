import * as api from '../../api';
import {
  FETCHED_USER,
  FETCHED_USER_ID,
  GET_USER,
  GET_USER_FAILED,
  UPDATE_USER,
} from '../../constant/actionType';
import { returnErrors } from './errorAction';

// GET ALL USER
export const getAllUser = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USER });

    const { data } = await api.getUser();
    return dispatch({ type: FETCHED_USER, payload: data });
  } catch (error) {
    dispatch(
      returnErrors(error.response.data.status, error.response.data.message)
    );
    dispatch({ type: GET_USER_FAILED });
  }
};

// GET USER BY ID
export const getUserById = (userId) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER });

    const { data } = await api.getUserById(userId);
    return dispatch({ type: FETCHED_USER_ID, payload: data });
  } catch (error) {
    dispatch(
      returnErrors(error.response.data.status, error.response.data.message)
    );
    dispatch({ type: GET_USER_FAILED });
  }
};

// UPDATE USER AUTHORIZATION
export const updateUser = (userId, userData) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER });

    const { data } = await api.updatUser(userId, userData);
    return dispatch({ type: UPDATE_USER, payload: data });
  } catch (error) {
    dispatch(
      returnErrors(error.response.data.status, error.response.data.message)
    );
    dispatch({ type: GET_USER_FAILED });
  }
};
