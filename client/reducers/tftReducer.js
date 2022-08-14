import * as types from '../constants/actionTypes';

const initialState = {
  TFTData: [],
  summonerName: '',
  summonerIcon: 0,
  summonerLevel: 0,
  summonerRank: {},
  otherPlayersMatches: [],
  region: '',
};

const tftReducer = (state = initialState, action) => {

  const { type, payload } = action;

  switch(type) {
    case types.ADD_TFT_DATA:
      return Object.assign(
        {},
        state, {
          TFTData: payload.TFTData,
          summonerName: payload.summonerName,
          summonerIcon: payload.summonerIcon,
          summonerLevel: payload.summonerLevel,
          summonerRank: payload.summonerRank,
          otherPlayersMatches: payload.otherPlayersMatches,
          region: payload.region,
        }
      );

    default: {
      return state;
    }
  }
};

export default tftReducer;