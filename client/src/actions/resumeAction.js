import { ADD_RESUME, FETCH_RESUME, EDIT_RESUME } from "./types";
import axios from "../axios/axios";

export const addResume = resumeData => async dispatch => {
  console.log(resumeData);
  const response = await axios.post("/addresume", { resumeData });
  console.log(response);
  const parsedData = JSON.parse(response.config.data);
  const parsedDataSelection = parsedData.resumeData;
  const array = [];
  array.push(parsedDataSelection);
  console.log(array);
  dispatch({
    type: ADD_RESUME,
    payload: array
  });
};

export const fetchResume = userId => async dispatch => {
  const response = await axios.get(`resumes/${userId}`);
  console.log(response.data);
  dispatch({
    type: FETCH_RESUME,
    payload: response.data
  });
};

export const editResume = (userId, resumeData) => async dispatch => {
  const response = await axios.put(`/resume/${userId}`, resumeData);
  console.log(JSON.parse(response.config.data));
  const array = [];
  array.push(JSON.parse(response.config.data));
  console.log(array);
  dispatch({
    type: EDIT_RESUME,
    payload: array
  });
};
