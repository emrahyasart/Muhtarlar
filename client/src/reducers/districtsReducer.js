import { FETCH_DISTRICTS } from "../actions/types";

export default (state = {}, action) => {
  if (action.type === FETCH_DISTRICTS) {
    return { ...state, ["key"]: action.payload };
  }
  return state;
};
