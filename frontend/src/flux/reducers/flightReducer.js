import {
  ADD_FLIGHT,
  DELETE_FLIGHT,
  DELETE_MANY_FLIGHTS,
  FETCHED_FLIGHTS,
  FETCHING_FLIGHTS,
  FETCHING_FLIGHT_FAILED,
  GET_FLIGHT_DETAIL,
  UPDATE_FLIGHT,
} from '../../constant/actionType';

const initialState = {
  isLoading: false,
  flights: [],
  flightDetail: {},
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
    case GET_FLIGHT_DETAIL:
      return {
        ...state,
        isLoading: false,
        flightDetail: action.payload,
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
      const currentFlight = state.flights.filter(
        (x) => x.uuid !== action.payload
      );
      return {
        ...state,
        isLoading: false,
        flights: currentFlight,
      };
    case DELETE_MANY_FLIGHTS:
      const currentFlights = state.flights.filter(
        (x) => !action.payload.includes(x.uuid)
      );
      return {
        ...state,
        isLoading: false,
        flights: currentFlights,
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
