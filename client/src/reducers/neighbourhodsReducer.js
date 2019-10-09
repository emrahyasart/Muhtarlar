import { FETCH_NEIGHBOURHOODS } from "../actions/types";

export default (state = {}, action) => {
  if (action.type === FETCH_NEIGHBOURHOODS) {
    return { ...state, ["key"]: action.payload };
  }
  return state;
};
