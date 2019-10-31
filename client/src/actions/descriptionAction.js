import { ADD_DESCRIPTION, FETCH_DESCRIPTION, EDIT_DESCRIPTION } from "./types";
import axios from "../axios/axios";

export const addDescription = descriptionData => async dispatch => {
  const response = await axios.post("/adddescription", { descriptionData });
  dispatch({
    type: ADD_DESCRIPTION,
    payload: response.data
  });
};

export const fetchDescription = neighbourhoodId => async dispatch => {
  const response = await axios.get(`descriptions/${neighbourhoodId}`);
  dispatch({
    type: FETCH_DESCRIPTION,
    payload: response.data
  });
};

export const editDescription = (
  neighbourhoodId,
  descriptionData
) => async dispatch => {
  const response = await axios.put(
    `/description/${neighbourhoodId}`,
    descriptionData
  );
  const array = [];
  array.push(JSON.parse(response.config.data));
  dispatch({
    type: EDIT_DESCRIPTION,
    payload: array
  });
};
