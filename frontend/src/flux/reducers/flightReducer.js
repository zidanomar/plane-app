import {
  ADD_FLIGHT,
  DELETE_FLIGHT,
  FETCHED_FLIGHTS,
  FETCHING_FLIGHTS,
  FETCHING_FLIGHT_FAILED,
  UPDATE_FLIGHT,
} from '../../constant/actionType';

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
    case ADD_FLIGHT:
      return {
        ...state,
        isLoading: false,
        flights: [...state.flights, action.payload],
      };
    case UPDATE_FLIGHT:
      let items = state.flights;
      const index = state.flights.findIndex(
        (x) => x.uuid === action.payload.uuid
      );

      items[index] = action.payload;
      return {
        ...state,
        isLoading: false,
        flights: items,
      };
    case DELETE_FLIGHT:
      const currentPlane = state.flights.filter(
        (x) => x.uuid !== action.payload
      );
      return {
        ...state,
        isLoading: false,
        flights: currentPlane,
      };
    case FETCHING_FLIGHT_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default flightReducer;
