import {
  FETCH_CITIES,
  FETCH_TOWNS,
  FETCH_DISTRICTS,
  FETCH_NEIGHBOURHOODS,
  FETCH_NEIGHBOURHOOD
} from "./types";
import axios from "../axios/axios";

export const fetchCities = () => async dispatch => {
  const response = await axios.get("cities");
  dispatch({ type: FETCH_CITIES, payload: response.data });
};

export const fetchTowns = cityId => async dispatch => {
  const response = await axios.get(`towns/${cityId}`);
  dispatch({ type: FETCH_TOWNS, payload: response.data });
};

export const fetchDistricts = townId => async dispatch => {
  const response = await axios.get(`districts/${townId}`);
  dispatch({ type: FETCH_DISTRICTS, payload: response.data });
};

export const fetchNeighbourhoods = districtId => async dispatch => {
  const response = await axios.get(`neighbourhoods/${districtId}`);
  dispatch({ type: FETCH_NEIGHBOURHOODS, payload: response.data });
};

export const fetchNeighbourhood = id => async dispatch => {
  const response = await axios.get(`/neighbourhood/${id}`);

  dispatch({ type: FETCH_NEIGHBOURHOOD, payload: response.data });
};
