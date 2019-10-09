import { FETCH_TOWNS } from "./types";
import axios from "../axios/axios";

export const fetchTowns = cityId => async dispatch => {
  const response = await axios.get(`towns/${cityId}`);
  dispatch({ type: FETCH_TOWNS, payload: response.data });
};
