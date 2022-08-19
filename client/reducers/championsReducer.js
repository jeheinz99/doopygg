import * as types from '../constants/actionTypes.js';

const initialState = {
  data: {},
};

const championsReducer = (state = initialState, action) => {

  const { type, payload } = action;

  switch(type) {
    case types.ADD_CHAMPION_DATA:

      return Object.assign(
        {}, 
        state, {
          data: payload.data,
        }
      );

  default: {
    return state;
    }
  }
}

export default championsReducer;