import * as types from '../constants/actionTypes.js';

const initialState = {
  leaderboardData: '',
}

const leaderboardReducer = (state = initialState, action) => {

  const { type, payload } = action;

  switch(type) {
    case types.ADD_LEADERBOARD_DATA:

      return Object.assign(
        {}, 
        state, {
          leaderboardData: payload.leaderboardData,
        }
      );

  default: {
    return state;
    }
  }
}

export default leaderboardReducer;