import { combineReducers } from "redux";

// import all reducers here
import summonerReducer from "./summonerReducer";

// combine reducers
const reducers = combineReducers({
  // if we have other reducers, they go here
  summoners: summonerReducer,
});

export default reducers;