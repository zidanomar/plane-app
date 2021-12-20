import {
  ADD_CUSTOMER,
  DELETE_CUSTOMER,
  DELETE_MANY_CUSTOMERS,
  FETCHED_CUSTOMERS,
  FETCHING_CUSTOMERS,
  FETCHING_CUSTOMER_FAILED,
  UPDATE_CUSTOMER,
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
    case ADD_CUSTOMER:
      return {
        ...state,
        isLoading: false,
        customers: [...state.customers, action.payload],
      };
    case UPDATE_CUSTOMER:
      const index = state.customers.findIndex(
        (x) => x.uuid === action.payload.uuid
      );
      let updatedItems = [...state.customers];
      updatedItems[index] = action.payload;
      return {
        ...state,
        isLoading: false,
        customers: updatedItems,
      };
    case DELETE_CUSTOMER:
      const currentCustomer = state.customers.filter(
        (x) => x.uuid !== action.payload
      );
      return {
        ...state,
        isLoading: false,
        customers: currentCustomer,
      };
    case DELETE_MANY_CUSTOMERS:
      const currentCustomers = state.customers.filter(
        (x) => !action.payload.includes(x.uuid)
      );
      return {
        ...state,
        isLoading: false,
        customers: currentCustomers,
      };
    case FETCHING_CUSTOMER_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default customerReducer;
