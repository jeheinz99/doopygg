import * as types from '../constants/actionTypes';

const initialState = {
  gameName: '',
  tagLine: '',
};

const valorantReducer = (state = initialState, action) => {

  const { type, payload } = action;
  switch(type) {
    case types.ADD_VALORANT_DATA:
      return Object.assign(
        {},
        state, {
          gameName: payload.gameName,
          tagLine: payload.tagLine,
        }
      );
    default: {
      return state;
    }
  }
};

export default valorantReducer;