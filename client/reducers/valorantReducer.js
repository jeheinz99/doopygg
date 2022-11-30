import * as types from '../constants/actionTypes';

const initialState = {
  loggedIn: {
    gameName: '',
    tagLine: '',
    puuid: '',
  },
  searchedUser: {
    gameName: '',
    tagLine: '',
    puuid: '',
    playerName: '',
    matchHistory: [],
  },
};

const valorantReducer = (state = initialState, action) => {

  const { type, payload } = action;
  switch(type) {
    case types.ADD_VALORANT_DATA:
      const newObj = {
        gameName: payload.gameName,
        tagLine: payload.tagLine,
        puuid: payload.puuid,
        matchHistory: payload.matchHistory
      };
      return Object.assign(
        {},
        state, {
          loggedIn: newObj,
          searchedUser: newObj,
        }
      );
    default: {
      return state;
    }
  }
};

export default valorantReducer;