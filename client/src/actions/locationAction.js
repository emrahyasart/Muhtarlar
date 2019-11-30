import { GET_LATLONG, ADD_MARKER } from "./types";
import axios from "../axios/axios";

export const getCoordinates = data => dispatch => {
  dispatch({
    type: GET_LATLONG,
    payload: data
  });
};

export const addMarker = (id, data) => async dispatch => {
  console.log(id, data);
  const response = await axios.post(`/addmarker/${id}`, data);
  console.log(response);
  dispatch({ type: ADD_MARKER, payload: response.data });
};
