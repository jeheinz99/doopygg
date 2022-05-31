import * as types from '../constants/actionTypes';

const initialState = {
  summonerName: '',
  summonerLevel: '',
  summonerRank: '',
  sommonerNameInput: '',
  matchHistory: [],
};

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
        summonerRank: payload.summonerRank,
        }
      );
      
  // returning default state if no case is met
  default: {
    return state;
    }
  }
};

export default summonerReducer;