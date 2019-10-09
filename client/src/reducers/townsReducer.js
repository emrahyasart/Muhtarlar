import { FETCH_TOWNS } from "../actions/types";

export default (state = {}, action) => {
  if (action.type === FETCH_TOWNS) {
    return { ...state, ["key"]: action.payload };
  }
  return state;
};
