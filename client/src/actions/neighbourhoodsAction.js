import { FETCH_NEIGHBOURHOODS } from "./types";
import axios from "../axios/axios";

export const fetchNeighbourhoods = districtId => async dispatch => {
  const response = await axios.get(`neighbourhoods/${districtId}`);
  dispatch({ type: FETCH_NEIGHBOURHOODS, payload: response.data });
};
