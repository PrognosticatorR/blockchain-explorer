import { UPDATE_TRANSACTIONS, FETCHING_DATA, SET_CURRENT_BLOCK } from "./types";
import { filterAccordingToTransaction } from "../../utils/helpers";

export const fetchTransactions = (blockData) => async (dispatch) => {
  dispatch({ type: FETCHING_DATA });
  const result = await filterAccordingToTransaction(blockData);
  return dispatch({ type: UPDATE_TRANSACTIONS, payload: result });
};

export const setCurrentBlock = (data) => (dispatch) => {
  return dispatch({ type: SET_CURRENT_BLOCK, payload: data });
};
