import {
  ADD_DESCRIPTION,
  FETCH_DESCRIPTION,
  EDIT_DESCRIPTION
} from "../actions/types";

const key = "key";

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_DESCRIPTION:
      return { ...state, [key]: action.payload };
    case FETCH_DESCRIPTION:
      return { ...state, [key]: action.payload };
    case EDIT_DESCRIPTION:
      return { ...state, [key]: action.payload };
    default:
      return state;
  }
};
