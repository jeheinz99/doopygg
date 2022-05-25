import * as types from '../constants/actionTypes';
import { connect } from 'react-redux';
import container from '../containers/SearchBox.jsx'

const initialState = {
  summonerName: '',
  summonerLevel: 0,
  summonerRank: '',
  matchHistory: [],
};

const summonerReducer = (state = initialState, action) => {
  
  const { type, payload } = action;

  switch (action.type) {
    case types.ADD_SUMMONER_DATA:
      return { ...state, 
        summonerName: action.payload,
        summonerLevel: action.payload,
        summonerRank: action.payload 
      };

  default: {
    return state;
    }
  }
};

export default summonerReducer;