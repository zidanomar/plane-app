import * as api from '../../api';
import {
  POSTING_LIKE,
  POSTING_LIKE_FAILED,
  POST_LIKE,
} from '../../constant/actionType';
import { returnErrors } from './errorAction';

export const postLike = (planeId) => async (dispatch) => {
  try {
    dispatch({ type: POSTING_LIKE });

    const { data } = await api.postLike(planeId);
    return dispatch({
      type: POST_LIKE,
      payload: data,
    });
  } catch (error) {
    dispatch(
      returnErrors(error.response.data.status, error.response.data.message)
    );
    dispatch({ type: POSTING_LIKE_FAILED });
  }
};
