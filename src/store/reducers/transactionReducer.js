import {
  UPDATE_TRANSACTIONS,
  FETCHING_DATA,
  SET_CURRENT_BLOCK,
} from "../actions/types";

const initialState = { transactions: [], isFetchingData: false, blockData: {} };

export function transactionReducer(state = initialState, action) {
  switch (action.type) {
    case FETCHING_DATA:
      return { ...state, isFetchingData: true };
    case UPDATE_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
        isFetchingData: false,
      };
    case SET_CURRENT_BLOCK:
      return { ...state, blockData: action.payload };
    default:
      return state;
  }
}
