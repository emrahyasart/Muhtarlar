import { ADD_PROJECT, FETCH_PROJECT, EDIT_PROJECT } from "../actions/types";

const key = "key";

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_PROJECT:
      return { ...state, [key]: action.payload };
    case FETCH_PROJECT:
      return { ...state, [key]: action.payload };
    case EDIT_PROJECT:
      return { ...state, [key]: action.payload };
    default:
      return state;
  }
};
