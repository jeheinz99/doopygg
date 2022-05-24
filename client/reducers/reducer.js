import * as types from '../constants/actionTypes';
import { connect } from 'react-redux';
import container from '../containers/SearchBox.jsx'

const initialState = {
  Matches: [],
  Name: 'something', 
}

const summonerReducer = (state = initialState, action) => {
  switch (action.type) {

  default: {
    return state;
    }
  }
};

export default summonerReducer;