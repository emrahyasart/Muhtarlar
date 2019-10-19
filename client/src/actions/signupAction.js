import { SIGN_UP } from "./types";
import history from "../history";
import axios from "../axios/axios";

export const signUp = userData => async dispatch => {
  const response = await axios.post("/signup", { userData });
  console.log(response.data);
  if (response.data === "phoneNo duplicate") {
    return alert("Telefon Numarası Kullanılmaktadır");
  } else if (response.data === "email duplicate") {
    return alert("Email Kullanılmaktadır");
  } else {
    return (
      dispatch({ type: SIGN_UP, payload: response.data }), history.push("/")
    );
  }
};
