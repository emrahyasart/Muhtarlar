import { SIGN_IN } from "../actions/types";

const key = "key";

export default (state = {}, action) => {
  if (action.type === SIGN_IN) {
    return { ...state, [key]: action.payload };
  }
  return state;
};
