import * as types from '../constants/actionTypes';

const initialState = {
  playerId: '',
};

const valorantReducer = (state = initialState, action) => {

  const { type, payload } = action;
  switch(type) {
    case types.ADD_VALORANT_DATA:
      return Object.assign(
        {},
        state, {
          playerId: payload.playerId,
        }
      );
    default: {
      return state;
    }
  }
};

export default valorantReducer;