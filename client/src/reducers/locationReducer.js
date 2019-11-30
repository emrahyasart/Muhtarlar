import { GET_LATLONG } from "../actions/types";

const key = "key";

export default (state = {}, action) => {
  if (action.type === GET_LATLONG) {
    return { ...state, [key]: action.payload };
  }
  return state;
};
