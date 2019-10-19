import { SIGN_UP } from "../actions/types";

export default (state = {}, action) => {
  if (action.type === SIGN_UP) {
    return { ...state, [action.payload.id]: action.payload };
  }
  return state;
};
