import { FETCH_USER, FETCH_USERBYEMAIL } from "../actions/types";

const key = "key";

// export default (state = {}, action) => {
//   if (action.type === FETCH_USER) {
//     return { ...state, [key]: action.payload };
//   }
//   return state;
// };

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_USER:
      return { ...state, [key]: action.payload };
    case FETCH_USERBYEMAIL:
      return { ...state, [key]: action.payload };
    default:
      return state;
  }
};
