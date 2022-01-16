import jwt_decode from 'jwt-decode';

import {
  FETCHING_USER,
  FETCHING_USER_FAILED,
  LOGIN,
  LOGOUT,
} from '../../constant/actionType';
import * as api from '../../api';
import { returnErrors } from './errorAction';

export const login = (userData, navigate) => async (dispatch) => {
  try {
    dispatch({ type: FETCHING_USER });

    const { data: jwtToken } = await api.login(userData);
    localStorage.setItem('authToken', jwtToken);

    const decoded = jwt_decode(jwtToken);
    navigate('/');
    return dispatch({ type: LOGIN, payload: decoded });
  } catch (error) {
    localStorage.removeItem('authToken');
    navigate('/auth');
    dispatch(
      returnErrors(error.response.data.status, error.response.data.message)
    );
    dispatch({ type: FETCHING_USER_FAILED });
  }
};

export const getAuth = () => async (dispatch) => {
  try {
    dispatch({ type: FETCHING_USER });

    const { data } = await api.getAuth();

    return dispatch({ type: LOGIN, payload: data });
  } catch (error) {
    localStorage.removeItem('authToken');
    dispatch(
      returnErrors(error.response.data.status, error.response.data.message)
    );
    dispatch({ type: FETCHING_USER_FAILED });
  }
};

export const logout = (navigate) => async (dispatch) => {
  dispatch({ type: LOGOUT });

  localStorage.removeItem('authToken');

  navigate('/');
};

export const register = (userData, navigate) => async (dispatch) => {
  try {
    dispatch({ type: FETCHING_USER });

    const { data: jwtToken } = await api.register(userData);
    localStorage.setItem('authToken', jwtToken);

    const decoded = jwt_decode(jwtToken);
    navigate('/');
    return dispatch({ type: LOGIN, payload: decoded });
  } catch (error) {
    localStorage.removeItem('authToken');
    navigate('/auth/register');
    dispatch(
      returnErrors(error.response.data.status, error.response.data.message)
    );
    dispatch({ type: FETCHING_USER_FAILED });
  }
};
