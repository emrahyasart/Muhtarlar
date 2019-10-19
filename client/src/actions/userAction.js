import { FETCH_USER, FETCH_USERBYEMAIL } from "./types";
import axios from "../axios/axios";

export const fetchUser = id => async dispatch => {
  const response = await axios.get(`/user/${id}`);

  dispatch({ type: FETCH_USER, payload: response.data });
};

export const fetchUserByEmail = email => async dispatch => {
  const response = await axios.get(`/useremail/${email}`);
  console.log(response);
  dispatch({ type: FETCH_USERBYEMAIL, payload: response.data });
};
