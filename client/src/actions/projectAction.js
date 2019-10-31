import { ADD_PROJECT, FETCH_PROJECT, EDIT_PROJECT } from "./types";
import axios from "../axios/axios";

export const addProject = projectData => async dispatch => {
  const response = await axios.post("/addproject", { projectData });
  dispatch({ type: ADD_PROJECT, payload: response.data });
};

export const fetchProject = userId => async dispatch => {
  const response = await axios.get(`projects/${userId}`);
  dispatch({
    type: FETCH_PROJECT,
    payload: response.data
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

  // array.push(JSON.parse(response.config.data)).then(() =>
  //   dispatch({
  //     type: EDIT_PROJECT,
  //     payload: array
  //   })
  // );
};
