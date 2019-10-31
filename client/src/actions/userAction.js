import {
  FETCH_USER,
  FETCH_USERBYEMAIL,
  SIGN_UP,
  SIGN_IN,
  FETCH_CANDIDATES
} from "./types";
import axios from "../axios/axios";
import history from "../history";

export const fetchUser = id => async dispatch => {
  const response = await axios.get(`/user/${id}`);
  dispatch({ type: FETCH_USER, payload: response.data });
};

export const fetchUserByEmail = email => async dispatch => {
  const response = await axios.get(`/useremail/${email}`);
  dispatch({ type: FETCH_USERBYEMAIL, payload: response.data });
};

export const signUp = userData => async dispatch => {
  const response = await axios.post("/signup", { userData });
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

export const signIn = info => async dispatch => {
  const response = await axios.post("/auth/signin", { info });
  dispatch({ type: SIGN_IN, payload: response.data });
  localStorage.setItem("auth", response.data.auth);
  localStorage.setItem("userId", response.data.id);
  localStorage.setItem("neighbourhoodId", response.data.user.neighbourhoodId);
  localStorage.setItem("role", response.data.user.role);
  localStorage.setItem(
    "neighbourhoodName",
    response.data.user.neighbourhoodName
  );

  history.push("/");
};
