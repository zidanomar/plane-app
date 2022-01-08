import jwt_decode from 'jwt-decode';

import {
  FETCHING_USER,
  FETCHING_USER_FAILED,
  LOGIN,
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
    navigate('/login');
    dispatch(
      returnErrors(error.response.data.status, error.response.data.message)
    );
    dispatch({ type: FETCHING_USER_FAILED });
  }
};

export const getAuth = (navigate) => async (dispatch) => {
  try {
    dispatch({ type: FETCHING_USER });

    const { data } = await api.getAuth();

    return dispatch({ type: LOGIN, payload: data });
  } catch (error) {
    localStorage.removeItem('authToken');
    navigate('/login');
    dispatch(
      returnErrors(error.response.data.status, error.response.data.message)
    );
    dispatch({ type: FETCHING_USER_FAILED });
  }
};
