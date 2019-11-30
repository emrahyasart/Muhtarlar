import { combineReducers } from "redux";
import citiesReducer from "./citiesReducer";
import townsReducer from "./townsReducer";
import districtsReducer from "./districtsReducer";
import neighbourhoodsReducer from "./neighbourhodsReducer";
import signupReducer from "./signupReducer";
import userReducer from "./userReducer";
import signinReducer from "./signinReducer";
import resumeReducer from "./resumeReducer";
import descriptionReducer from "./descriptionReducer";
import projectReducer from "./projectReducer";
import imageReducer from "./imageReducer";
import locationReducer from "./locationReducer";

export default combineReducers({
  cities: citiesReducer,
  towns: townsReducer,
  districts: districtsReducer,
  neighbourhoods: neighbourhoodsReducer,
  users: signupReducer,
  currentUser: userReducer,
  userSignedIn: signinReducer,
  resume: resumeReducer,
  description: descriptionReducer,
  project: projectReducer,
  image: imageReducer,
  location: locationReducer
});
