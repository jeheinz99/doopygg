import { combineReducers } from 'redux';

// import all reducers here
import summonerReducer from './summonerReducer';
import championsReducer from './championsReducer';
import leaderboardReducer from './leaderboardReducer';
import valorantReducer from './valorantReducer';
import tftReducer from './tftReducer';

// combine reducers
const reducers = combineReducers({
  summoners: summonerReducer,
  champions: championsReducer,
  leaderboard: leaderboardReducer,
  valorant: valorantReducer,
  tft: tftReducer,
});

export default reducers;