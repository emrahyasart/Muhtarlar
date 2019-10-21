import { SIGN_IN } from "./types";
import history from "../history";
import axios from "../axios/axios";

export const signIn = info => async dispatch => {
  const response = await axios.post("/auth/signin", { info });
  console.log(response);
  dispatch({ type: SIGN_IN, payload: response.data });
  localStorage.setItem("auth", response.data.auth);
  localStorage.setItem("userId", response.data.id);
  localStorage.setItem("neighbourhoodId", response.data.user.neighbourhoodId);
  localStorage.setItem("role", response.data.user.role);
  localStorage.setItem(
    "neighbourhoodName",
    response.data.user.neighbourhoodName
  );

  console.log(localStorage);
  history.push("/");
};
