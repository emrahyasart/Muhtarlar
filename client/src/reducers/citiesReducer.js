import { FETCH_CITIES } from "../actions/types";

export default (state = [], action) => {
  if (action.type === FETCH_CITIES) {
    return [...state, action.payload];
  }
  return state;
};
