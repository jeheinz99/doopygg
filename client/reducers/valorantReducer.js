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
  failedSearch: false,
};

const valorantReducer = (state = initialState, action) => {

  const { type, payload } = action;
  switch(type) {
    case types.ADD_VALORANT_DATA:
      const addObj = {
        gameName: payload.gameName,
        tagLine: payload.tagLine,
        puuid: payload.puuid,
        playerName: state.searchedUser.playerName,
        matchHistory: payload.matchHistory
      };
      return Object.assign(
        {},
        state, 
        {
          loggedIn: addObj,
          searchedUser: addObj,
          failedSearch: !payload.search,
        }
      );
    case types.FAILED_VAL_SEARCH:
      const failedObj = {
        gameName: payload.gameName,
        tagLine: payload.tagLine,
        puuid: '',
        playerName: '',
        matchHistory: [],
      };
      return Object.assign(
        {},
        state,
        {
          searchedUser: failedObj,
          failedSearch: !payload.search,
        }
      );
    default: {
      return state;
    }
  }
};

export default valorantReducer;