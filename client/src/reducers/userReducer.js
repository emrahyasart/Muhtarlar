import {
  FETCH_USER,
  FETCH_USERBYEMAIL,
  FETCH_USERBYID,
  USER_UPDATE,
  NEIGHBOURHOOD_UPDATE,
  ROLE_UPDATE
} from "../actions/types";

const key = "key";
const keyUpdate = "keyUpdate";
const keyNeighbourhoodUpdate = "keyNeighbourhoodUpdate";
const keyUserByEmail = "keyUserByEmail";
const keyUserById = "keyUserById";
const keyUserByRole = "keyUserByRole";

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
      return { ...state, [keyUserByEmail]: action.payload };
    case FETCH_USERBYID:
      return { ...state, [keyUserById]: action.payload };
    case USER_UPDATE:
      return { ...state, [keyUpdate]: action.payload };
    case NEIGHBOURHOOD_UPDATE:
      return { ...state, [keyNeighbourhoodUpdate]: action.payload };
    case ROLE_UPDATE:
      return { ...state, [keyUserByRole]: action.payload };
    default:
      return state;
  }
};
