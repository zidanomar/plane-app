import {
  ADD_COMPANY,
  DELETE_COMPANY,
  DELETE_MANY_COMPANY,
  FETCHED_COMPANY,
  FETCHING_COMPANY,
  FETCHING_COMPANY_FAILED,
  GET_COMPANY_BY_USER,
  GET_COMPANY_DETAIL,
  UPDATE_COMPANY,
} from '../../constant/actionType';

const initialState = {
  isLoading: false,
  companies: [],
  companyDetail: {},
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_COMPANY:
      return {
        ...state,
        isLoading: true,
      };
    case FETCHED_COMPANY:
      return {
        ...state,
        isLoading: false,
        companies: action.payload,
      };
    case GET_COMPANY_DETAIL:
      return {
        ...state,
        isLoading: false,
        companyDetail: action.payload,
      };
    case GET_COMPANY_BY_USER:
      return {
        ...state,
        isLoading: false,
        companyDetail: action.payload,
      };
    case ADD_COMPANY:
      return {
        ...state,
        isLoading: false,
        companies: [...state.companies, action.payload],
      };
    case UPDATE_COMPANY:
      const index = state.companies.findIndex(
        (x) => x.uuid === action.payload.uuid
      );
      let updatedItems = [...state.companies];
      updatedItems[index] = action.payload;
      return {
        ...state,
        isLoading: false,
        companies: updatedItems,
      };
    case DELETE_COMPANY:
      const currentCompany = state.companies.filter(
        (x) => x.uuid !== action.payload
      );
      return {
        ...state,
        isLoading: false,
        companies: currentCompany,
      };
    case DELETE_MANY_COMPANY:
      const currentCompanies = state.companies.filter(
        (x) => !action.payload.includes(x.uuid)
      );
      return {
        ...state,
        isLoading: false,
        companies: currentCompanies,
      };
    case FETCHING_COMPANY_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default customerReducer;
