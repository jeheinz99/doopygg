import { combineReducers } from "redux";

// import all reducers here
import summonerReducer from "./summonerReducer";
import championsReducer from "./championsReducer";
import leaderboardReducer from "./leaderboardReducer";
import valorantReducer from "./valorantReducer";
import tftReducer from "./tftReducer";

// combine reducers
const reducers = combineReducers({
  // if we have other reducers, they go here
  summoners: summonerReducer,
  champions: championsReducer,
  leaderboard: leaderboardReducer,
  valorant: valorantReducer,
  tft: tftReducer,
});

export default reducers;