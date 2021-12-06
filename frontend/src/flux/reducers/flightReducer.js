import { FETCHED_FLIGHTS, FETCHING_FLIGHTS } from '../../constant/actionType';

const initialState = {
  isLoading: false,
  flights: [],
};

export const flightReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_FLIGHTS:
      return {
        ...state,
        isLoading: true,
      };
    case FETCHED_FLIGHTS:
      return {
        ...state,
        isLoading: false,
        flights: action.payload,
      };
    default:
      return state;
  }
};

export default flightReducer;
