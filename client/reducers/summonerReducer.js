import * as types from '../constants/actionTypes';

const initialState = {
  summonerName: '',
  summonerLevel: 0,
  matchHistory: [],
  summonerRank: '',
  otherPlayersMatches: [],
  allMatchesPlayed: [],
}

const summonerReducer = (state = initialState, action) => {
  
  const { type, payload } = action;

  switch (type) {
    case types.ADD_SUMMONER_DATA:

      return Object.assign(
        {}, 
        state, {
        summonerName: payload.summonerName,
        summonerLevel: payload.summonerRecentData.summonerLevel,
        matchHistory: payload.summonerRecentData.matchHistory,
        summonerRank: payload.summonerRecentData.summonerRank,
        otherPlayersMatches: payload.summonerRecentData.otherPlayersMatches,
        allMatchesPlayed: payload.matchesPlayed,
        }
      );
    
    case types.ADD_SUMM_CHAMP_DATA:

        return Object.assign(
          {},
          state, {
            playerChampData: payload.playerChampData,
          }
        );

  // returning default state if no case is met
  default: {
    return state;
    }
  }
};

export default summonerReducer;