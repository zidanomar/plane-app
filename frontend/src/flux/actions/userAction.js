import * as api from '../../api';
import {
  FETCHED_CUSTOMERS,
  FETCHING_CUSTOMERS,
} from '../../constant/actionType';
import { returnErrors } from './errorAction';

export const getAllCustomers = () => async (dispatch) => {
  try {
    dispatch({ type: FETCHING_CUSTOMERS });

    const customers = await api.getAllCustomers();
    return dispatch({ type: FETCHED_CUSTOMERS, payload: customers.data });
  } catch (error) {
    dispatch(returnErrors(error.response.data.message, error.response.status));
    dispatch({ type: FETCHED_CUSTOMERS, payload: [] });
  }
};
