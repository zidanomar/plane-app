import { GET_ERRORS, CLEAR_ERRORS } from '../../constant/actionType';

export const returnErrors = (status, message) => {
  return {
    type: GET_ERRORS,
    payload: { status, message },
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
