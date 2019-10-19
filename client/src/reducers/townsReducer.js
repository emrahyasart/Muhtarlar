import { FETCH_TOWNS } from "../actions/types";

const key = "key";

export default (state = {}, action) => {
  if (action.type === FETCH_TOWNS) {
    return { ...state, [key]: action.payload };
  }
  return state;
};
