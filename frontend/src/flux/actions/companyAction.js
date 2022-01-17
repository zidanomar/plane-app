import * as api from '../../api';
import {
  ADD_COMPANY,
  DELETE_COMPANY,
  DELETE_MANY_COMPANY,
  FETCHED_COMPANY,
  FETCHING_COMPANY,
  FETCHING_COMPANY_FAILED,
  UPDATE_COMPANY,
} from '../../constant/actionType';
import { returnErrors } from './errorAction';

// GET ALL COMPANY
export const getAllCompany = () => async (dispatch) => {
  try {
    dispatch({ type: FETCHING_COMPANY });

    const { data } = await api.getAllCompany();
    return dispatch({ type: FETCHED_COMPANY, payload: data });
  } catch (error) {
    dispatch(
      returnErrors(error.response.data.status, error.response.data.message)
    );
    dispatch({ type: FETCHING_COMPANY_FAILED });
  }
};

// ADD NEW COMPANY
export const addNewCompany = (newCompanyData) => async (dispatch) => {
  try {
    dispatch({ type: FETCHING_COMPANY });

    const { data } = await api.addNewCompany(newCompanyData);

    return dispatch({
      type: ADD_COMPANY,
      payload: data,
    });
  } catch (error) {
    dispatch(
      returnErrors(error.response.data.status, error.response.data.message)
    );
    dispatch({ type: FETCHING_COMPANY_FAILED });
  }
};

// UPDATE COMPANY
export const updateCompany =
  (companyId, newCompanyData) => async (dispatch) => {
    try {
      const { data } = await api.updateCompany(companyId, newCompanyData);

      dispatch({ type: UPDATE_COMPANY, payload: data });
    } catch (error) {
      dispatch(
        returnErrors(error.response.data.status, error.response.data.message)
      );
      dispatch({ type: FETCHING_COMPANY_FAILED });
    }
  };

// DELETE SPECIFIIED COMPANY
export const deleteCompany = (companyId) => async (dispatch) => {
  try {
    dispatch({ type: FETCHING_COMPANY });

    const { data } = await api.deleteCompany(companyId);

    dispatch({ type: DELETE_COMPANY, payload: data });
  } catch (error) {
    dispatch(
      returnErrors(error.response.data.status, error.response.data.message)
    );
    dispatch({ type: FETCHING_COMPANY_FAILED });
  }
};

// DELETE MANY CUSTOMERS
export const deleteManyCompany = (selectedItems) => async (dispatch) => {
  const uuids = { selectedItems };
  try {
    dispatch({ type: FETCHING_COMPANY });

    await api.deleteManyCompany(uuids);

    dispatch({ type: DELETE_MANY_COMPANY, payload: selectedItems });
  } catch (error) {
    dispatch(
      returnErrors(error.response.data.status, error.response.data.message)
    );
    dispatch({ type: FETCHING_COMPANY_FAILED });
  }
};
