import * as types from '../constants/actionTypes';

const initialState = {
  summonerName: '',
  summonerLevel: 0,
  summonerRank: {},
  puuid: '',
  summonerId: '',
  accountId: '',
  profileIconId: 0,
  matchHistory: [],
  otherPlayersMatches: [],
  allMatchesPlayed: [],
  allMatchesPlayedData: [],
  lastUpdated: 0,
  region: '',
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
        summonerRank: payload.summonerRank,
        puuid: payload.puuid,
        summonerId: payload.summonerId,
        accountId: payload.accountId,
        matchHistory: payload.matchHistory,
        profileIconId: payload.profileIcon,
        otherPlayersMatches: payload.otherPlayersMatches,
        allMatchesPlayed: payload.allMatchesPlayed,
        allMatchesPlayedData: payload.allMatchesPlayedData,
        lastUpdated: payload.lastUpdated,
        region: payload.region,
        }
      );
    
    case types.EXPAND_SUMM_MATCH_HISTORY:
      // create copy of current array of state of matches
      let matchHistoryCopy = state.matchHistory;
      let otherPlayersDataCopy = state.otherPlayersMatches;

      // concat the new matches from the payload onto the current state of matches
      matchHistoryCopy = matchHistoryCopy.concat(payload.matchesData);
      otherPlayersDataCopy = otherPlayersDataCopy.concat(payload.otherPlayersMatches);

      return Object.assign(
        {},
        state, {
          matchHistory: matchHistoryCopy,
          otherPlayersMatches: otherPlayersDataCopy
        }
      );
  // returning default state if no case is met
  default: {
    return state;
    }
  }
};

export default summonerReducer;