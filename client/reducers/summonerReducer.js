import * as types from '../constants/actionTypes';

const initialState = {
  summonerName: '',
  summonerLevel: 0,
  profileIconId: 0,
  summonerRank: {},
  matchHistory: [],
  otherPlayersMatches: [],
  allMatchesPlayed: [],
  allMatchesPlayedData: [],
}

const summonerReducer = (state = initialState, action) => {
  
  const { type, payload } = action;

  switch (type) {
    case types.ADD_SUMMONER_DATA:

      return Object.assign(
        {}, 
        state, {
        summonerName: payload.summonerName,
        summonerLevel: payload.summonerLevel,
        matchHistory: payload.matchHistory,
        profileIconId: payload.profileIcon,
        summonerRank: payload.summonerRank,
        otherPlayersMatches: payload.otherPlayersMatches,
        allMatchesPlayed: payload.allMatchesPlayed,
        allMatchesPlayedData: payload.allMatchesPlayedData,
        }
      );

  // returning default state if no case is met
  default: {
    return state;
    }
  }
};

export default summonerReducer;