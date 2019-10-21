import { ADD_DESCRIPTION, FETCH_DESCRIPTION, EDIT_DESCRIPTION } from "./types";
import axios from "../axios/axios";

export const addDescription = descriptionData => async dispatch => {
  const response = await axios.post("/adddescription", { descriptionData });
  console.log(JSON.parse(response.config.data));
  dispatch({
    type: ADD_DESCRIPTION,
    payload: JSON.parse(response.config.data)
  });
};

export const fetchDescription = neighbourhoodId => async dispatch => {
  const response = await axios.get(`descriptions/${neighbourhoodId}`);
  console.log(response.data);
  dispatch({
    type: FETCH_DESCRIPTION,
    payload: response.data.length === 0 ? response.data : response.data[0]
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
  console.log(JSON.parse(response.config.data));
  dispatch({
    type: EDIT_DESCRIPTION,
    payload: JSON.parse(response.config.data)
  });
};
