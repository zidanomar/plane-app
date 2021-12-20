import * as api from '../../api';
import {
  ADD_CUSTOMER,
  DELETE_CUSTOMER,
  FETCHED_CUSTOMERS,
  FETCHING_CUSTOMERS,
  UPDATE_CUSTOMER,
  FETCHING_CUSTOMER_FAILED,
  DELETE_MANY_CUSTOMERS,
} from '../../constant/actionType';
import { returnErrors } from './errorAction';

// GET ALL CUSTOMERS
export const getAllCustomers = () => async (dispatch) => {
  try {
    dispatch({ type: FETCHING_CUSTOMERS });

    const customers = await api.getAllCustomers();
    return dispatch({ type: FETCHED_CUSTOMERS, payload: customers.data });
  } catch (error) {
    dispatch(
      returnErrors(error.response.data.status, error.response.data.message)
    );
    dispatch({ type: FETCHING_CUSTOMER_FAILED });
  }
};

// ADD NEW CUSTOMER
export const addNewCustomer = (newCustomerData) => async (dispatch) => {
  try {
    dispatch({ type: FETCHING_CUSTOMERS });

    const newCustomer = await api.addNewCustomer(newCustomerData);

    return dispatch({
      type: ADD_CUSTOMER,
      payload: newCustomer.data,
    });
  } catch (error) {
    dispatch(
      returnErrors(error.response.data.status, error.response.data.message)
    );
    dispatch({ type: FETCHING_CUSTOMER_FAILED });
  }
};

// UPDATE CUSTOMER
export const updateCustomer = (customerId, newCustomer) => async (dispatch) => {
  try {
    const updatedCustomer = await api.updateCustomer(customerId, newCustomer);

    dispatch({ type: UPDATE_CUSTOMER, payload: updatedCustomer.data });
  } catch (error) {
    dispatch(
      returnErrors(error.response.data.status, error.response.data.message)
    );
    dispatch({ type: FETCHING_CUSTOMER_FAILED });
  }
};

// DELETE SPECIFIIED CUSTOMER
export const deleteCustomer = (customerId) => async (dispatch) => {
  try {
    dispatch({ type: FETCHING_CUSTOMERS });

    const deletedCustomer = await api.deleteCustomer(customerId);

    dispatch({ type: DELETE_CUSTOMER, payload: deletedCustomer.data });
  } catch (error) {
    dispatch(
      returnErrors(error.response.data.status, error.response.data.message)
    );
    dispatch({ type: FETCHING_CUSTOMER_FAILED });
  }
};

// DELETE MANY CUSTOMERS
export const deleteManyCustomer = (selectedItems) => async (dispatch) => {
  const uuids = { selectedItems };
  try {
    dispatch({ type: FETCHING_CUSTOMERS });

    await api.deleteManyCustomers(uuids);

    dispatch({ type: DELETE_MANY_CUSTOMERS, payload: selectedItems });
  } catch (error) {
    dispatch(
      returnErrors(error.response.data.status, error.response.data.message)
    );
    dispatch({ type: FETCHING_CUSTOMER_FAILED });
  }
};
