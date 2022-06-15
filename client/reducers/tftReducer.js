import * as types from '../constants/actionTypes';

const initialState = {
  TFTData: [],
  summonerName: '',
  summonerIcon: 0,
  otherPlayersData: [],
};

const tftReducer = (state = initialState, action) => {

  const { type, payload } = action;

  switch(type) {
    case types.ADD_TFT_DATA:
      // console.log(Object.assign(
      //   {},
      //   state, {
      //     TFTData: payload.TFTData,
      //   }
      // ));

      return Object.assign(
        {},
        state, {
          TFTData: payload.TFTData,
          summonerName: payload.summonerName,
          summonerIcon: payload.summonerIcon,
          otherPlayersData: payload.otherPlayersData,
        }
      );

    default: {
      return state;
    }
  }
};

export default tftReducer;