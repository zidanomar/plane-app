import * as api from '../../api';
import {
  ADD_CUSTOMER,
  DELETE_CUSTOMER,
  FETCHED_CUSTOMERS,
  FETCHING_CUSTOMERS,
  UPDATE_CUSTOMER,
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

export const addNewCustomer = (newCustomerData) => async (dispatch) => {
  try {
    dispatch({ type: FETCHING_CUSTOMERS });

    const newCustomer = await api.addNewCustomer(newCustomerData);

    return dispatch({ type: ADD_CUSTOMER, payload: newCustomer.data });
  } catch (error) {
    dispatch(returnErrors(error.response.data.message, error.response.status));
    dispatch({ type: ADD_CUSTOMER, payload: {} });
  }
};

export const deleteCustomer = (customerId) => async (dispatch) => {
  try {
    dispatch({ type: FETCHING_CUSTOMERS });

    const deletedCustomer = await api.deleteCustomer(customerId);

    dispatch({ type: DELETE_CUSTOMER, payload: deletedCustomer.data });
  } catch (error) {
    dispatch(returnErrors(error.response.data.message, error.response.status));
    dispatch({ type: ADD_CUSTOMER, payload: {} });
  }
};

export const updateCustomer = (customerId, newCustomer) => async (dispatch) => {
  try {
    const updatedCustomer = await api.updateCustomer(customerId, newCustomer);

    dispatch({ type: UPDATE_CUSTOMER, payload: updatedCustomer.data });
  } catch (error) {
    dispatch(returnErrors(error.response.data.message, error.response.status));
    dispatch({ type: UPDATE_CUSTOMER, payload: {} });
  }
};
