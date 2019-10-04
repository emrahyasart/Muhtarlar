import { FETCH_CITIES } from "./types";
import axios from "../axios/axios";

export const fetchCities = () => async dispatch => {
  const response = await axios.get("cities");

  dispatch({ type: FETCH_CITIES, payload: response.data });
};

// const _getCities = cities => ({
//   type: FETCH_CITIES,
//   cities
// });

// export const getCities = () => {
//   console.log("request sent");
//   return dispatch => {
//     return axios.get("cities").then(result => {
//       console.log(result);
//       const cities = [];
//       result.data.forEach(item => {
//         cities.push(item);
//       });

//       dispatch(_getCities(cities));
//     });
//   };
// };
