import { SIGN_IN } from "../actions/types";

const key = "key";

export default (state = {}, action) => {
  if (action.type === SIGN_IN) {
    return { ...state, [key]: action.payload };
  }
  return state;
};

// export default (state = {}, action) => {
//   switch (action.type) {
//     case SIGN_IN:
//       return { ...state, [key]: action.payload };
//     case SIGN_INSTORE:
//       return { ...state, [key]: action.payload };
//     default:
//       return state;
//   }
// };
