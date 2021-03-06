import { FETCH_DISTRICTS } from "../actions/types";

const key = "key";

export default (state = {}, action) => {
  if (action.type === FETCH_DISTRICTS) {
    return { ...state, [key]: action.payload };
  }
  return state;
};
