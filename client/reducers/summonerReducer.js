import * as types from '../constants/actionTypes';
import { connect } from 'react-redux';
import SearchBox from '../containers/SearchBox.jsx'

const initialState = {
  summonerName: '',
  summonerLevel: 0,
  summonerRank: '',
  sommonerNameInput: '',
  matchHistory: [],
};

const summonerReducer = (state = initialState, action) => {
  
  const { type, payload } = action;

  // console.log(type);
  // console.log(payload);

  switch (type) {
    case types.ADD_SUMMONER_DATA:
      return { ...state, 
        summonerName: payload.summonerName,
        summonerLevel: payload.summonerLevel,
      };

    // case types.ADD_MATCH_HISTORY:
    //   return { ...state,
    //     matchHistory: action.payload,
    //   }

  default: {
    return state;
    }
  }
};

export default summonerReducer;