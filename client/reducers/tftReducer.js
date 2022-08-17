import * as types from '../constants/actionTypes';

const initialState = {
  summonerName: '',
  summonerLevel: 0,
  summonerRank: {},
  puuid: '',
  summonerId: '',
  accountId: '',
  summonerIcon: 0,
  TFTData: [],
  otherPlayersMatches: [],
  allMatchesPlayed: [],
  allMatchesPlayedData: [],
  lastUpdated: 0,
  region: '',
};

const tftReducer = (state = initialState, action) => {

  const { type, payload } = action;

  switch(type) {
    case types.ADD_TFT_DATA:
      return Object.assign(
        {},
        state, {
          summonerName: payload.summonerName,
          summonerLevel: payload.summonerLevel,
          summonerRank: payload.summonerRank,
          puuid: payload.puuid,
          summonerId: payload.summonerId,
          accountId: payload.accountId,
          TFTData: payload.TFTData,
          summonerIcon: payload.summonerIcon,
          otherPlayersMatches: payload.otherPlayersMatches,
          allMatchesPlayed: payload.allMatchesPlayed,
          allMatchesPlayedData: payload.allMatchesPlayedData,
          lastUpdated: payload.lastUpdated,
          region: payload.region,
        }
      );

    default: {
      return state;
    }
  }
};

export default tftReducer;