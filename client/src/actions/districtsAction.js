import { FETCH_DISTRICTS } from "./types";
import axios from "../axios/axios";

export const fetchDistricts = townId => async dispatch => {
  const response = await axios.get(`districts/${townId}`);
  dispatch({ type: FETCH_DISTRICTS, payload: response.data });
};
