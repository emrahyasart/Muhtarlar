import { ADD_RESUME, FETCH_RESUME, EDIT_RESUME } from "./types";
import axios from "../axios/axios";

export const addResume = resumeData => async dispatch => {
  const response = await axios.post("/addresume", { resumeData });
  console.log(JSON.parse(response.config.data));
  dispatch({ type: ADD_RESUME, payload: JSON.parse(response.config.data) });
};

export const fetchResume = neighbourhoodId => async dispatch => {
  const response = await axios.get(`resumes/${neighbourhoodId}`);
  console.log(response.data);
  dispatch({
    type: FETCH_RESUME,
    payload: response.data.length === 0 ? response.data : response.data[0]
  });
};

export const editResume = (neighbourhoodId, resumeData) => async dispatch => {
  const response = await axios.put(`/resume/${neighbourhoodId}`, resumeData);
  console.log(JSON.parse(response.config.data));
  dispatch({ type: EDIT_RESUME, payload: JSON.parse(response.config.data) });
};
