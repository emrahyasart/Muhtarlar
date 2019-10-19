import { SIGN_IN } from "./types";
import history from "../history";
import axios from "../axios/axios";

export const signIn = info => async dispatch => {
  const response = await axios.post("/auth/signin", { info });
  console.log(response);
  dispatch({ type: SIGN_IN, payload: response.data });
};
