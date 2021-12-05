import {
  FETCHED_CUSTOMERS,
  FETCHING_CUSTOMERS,
} from '../../constant/actionType';

const initialState = {
  isLoading: false,
  customers: [],
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_CUSTOMERS:
      return {
        ...state,
        isLoading: true,
      };
    case FETCHED_CUSTOMERS:
      return {
        ...state,
        isLoading: false,
        customers: action.payload,
      };
    default:
      return state;
  }
};

export default customerReducer;
