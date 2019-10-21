import { ADD_RESUME, FETCH_RESUME, EDIT_RESUME } from "../actions/types";

const key = "key";

// export default (state = {}, action) => {
//   if (action.type === ADD_RESUME) {
//     return { ...state, [key]: action.payload };
//   }
//   return state;
// };

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_RESUME:
      return { ...state, [key]: action.payload };
    case FETCH_RESUME:
      return { ...state, [key]: action.payload };
    case EDIT_RESUME:
      return { ...state, [key]: action.payload };
    default:
      return state;
  }
};
