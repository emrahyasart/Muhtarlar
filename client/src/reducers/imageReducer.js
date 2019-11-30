import { ADD_IMAGE } from "../actions/types";

const key = "key";

export default (state = {}, action) => {
  if (action.type === ADD_IMAGE) {
    return { ...state, [key]: action.payload };
  }
  return state;
};
