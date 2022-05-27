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
  // console.log(payload);

  // console.log(type);
  // console.log(payload);

  switch (type) {
    case types.ADD_SUMMONER_DATA:
      //logging state, not altering 

      // console.log(Object.assign(
      //   {},
      //   state, {
      //     summonerName: payload.summonerName,
      //     summonerLevel: payload.summonerLevel,
      //     matchHistory: payload.matchHistory
      //   }
      // ));

      // returning new state if case ADD_SUMMONER_DATA is met
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