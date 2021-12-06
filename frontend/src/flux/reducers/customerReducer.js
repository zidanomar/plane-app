import {
  ADD_CUSTOMER,
  DELETE_CUSTOMER,
  FETCHED_CUSTOMERS,
  FETCHING_CUSTOMERS,
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
      // const newUser = { ...action.payload, planes: [] };
      return {
        ...state,
        isLoading: false,
        customers: [...state.customers, action.paylaod],
      };
    case UPDATE_CUSTOMER:
      const index = state.customers.findIndex(
        (x) => x.uuid === action.payload.uuid
      );
      state.customers[index] = action.payload;

      return {
        ...state,
        isLoading: false,
        customers: [...state.customers],
      };
    case DELETE_CUSTOMER:
      const currentCustomer = state.customers.filter(
        (x) => x.uuid !== action.payload
      );
      console.log(currentCustomer);
      return {
        ...state,
        isLoading: false,
        customers: currentCustomer,
      };
    default:
      return state;
  }
};

export default customerReducer;
