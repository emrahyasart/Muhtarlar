import { FETCH_NEIGHBOURHOODS, FETCH_NEIGHBOURHOOD } from "./types";
import axios from "../axios/axios";

export const fetchNeighbourhoods = districtId => async dispatch => {
  const response = await axios.get(`neighbourhoods/${districtId}`);
  dispatch({ type: FETCH_NEIGHBOURHOODS, payload: response.data });
};

export const fetchNeighbourhood = id => async dispatch => {
  const response = await axios.get(`/neighbourhood/${id}`);

  dispatch({ type: FETCH_NEIGHBOURHOOD, payload: response.data });
};
