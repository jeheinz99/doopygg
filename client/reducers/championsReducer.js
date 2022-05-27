import * as types from '../constants/actionTypes.js';

const initialState = {
  championName: '',
}

const championsReducer = (state = initialState, action) => {

  const { type, payload } = action;

  switch(type) {
    case types.ADD_CHAMPION_DATA:

  default: {
    return state;
    }
  }
}

export default championsReducer;