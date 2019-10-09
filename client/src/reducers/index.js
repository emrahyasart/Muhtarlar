import { combineReducers } from "redux";
import citiesReducer from "./citiesReducer";
import townsReducer from "./townsReducer";
import districtsReducer from "./districtsReducer";
import neighbourhoodsReducer from "./neighbourhodsReducer";

export default combineReducers({
  cities: citiesReducer,
  towns: townsReducer,
  districts: districtsReducer,
  neighbourhoods: neighbourhoodsReducer
});
