import { combineReducers } from "redux";

// import all reducers here
import summonerReducer from "./summonerReducer";
import championsReducer from "./championsReducer";
import leaderboardReducer from "./leaderboardReducer";

// combine reducers
const reducers = combineReducers({
  // if we have other reducers, they go here
  summoners: summonerReducer,
  champions: championsReducer,
  leaderboard: leaderboardReducer,
});

export default reducers;