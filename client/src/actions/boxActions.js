import {
  ADD_DESCRIPTION,
  FETCH_DESCRIPTION,
  EDIT_DESCRIPTION,
  ADD_PROJECT,
  FETCH_PROJECT,
  EDIT_PROJECT,
  ADD_RESUME,
  FETCH_RESUME,
  EDIT_RESUME
} from "./types";
import axios from "../axios/axios";

export const addDescription = descriptionData => async dispatch => {
  const response = await axios.post("/adddescription", { descriptionData });
  dispatch({
    type: ADD_DESCRIPTION,
    payload: response.data
  });
};

export const addProject = projectData => async dispatch => {
  const response = await axios.post("/addproject", { projectData });
  dispatch({ type: ADD_PROJECT, payload: response.data });
};

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

export const fetchDescription = neighbourhoodId => async dispatch => {
  const response = await axios.get(`descriptions/${neighbourhoodId}`);
  dispatch({
    type: FETCH_DESCRIPTION,
    payload: response.data
  });
};

export const fetchProject = userId => async dispatch => {
  const response = await axios.get(`projects/${userId}`);
  dispatch({
    type: FETCH_PROJECT,
    payload: response.data
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

export const editProject = (userId, projectData) => async dispatch => {
  const array = [];
  const response = await axios
    .put(`/project/${userId}`, projectData)
    .then(res => array.push(JSON.parse(res.config.data)))
    .then(() =>
      dispatch({
        type: EDIT_PROJECT,
        payload: array
      })
    );
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
