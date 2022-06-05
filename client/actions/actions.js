// import actionType constants
import axios from 'axios'
import * as types from '../constants/actionTypes';

// export actions and payloads

export const addSummonerDataActionCreator = summonerData => ({
  type: types.ADD_SUMMONER_DATA,
  payload: summonerData
});

export const addChampionDataActionCreator = championData => ({
  type: types.ADD_CHAMPION_DATA,
  payload: championData
});

export const addLeaderboardDataActionCreator = leaderboardData => ({
  type: types.ADD_LEADERBOARD_DATA,
  payload: leaderboardData
});

export const addValorantDataActionCreator = valorantData => ({
  type: types.ADD_VALORANT_DATA,
  payload: valorantData
});

export const addTFTDataActionCreator = TFTData => ({
  type: types.ADD_TFT_DATA,
  payload: TFTData
});

// async thunks
export const getLeaderboardData = (regionName) => async dispatch => {
  const responseLeaderboardData = await axios.get(`/leaderboards/${regionName}`);
  console.log('LEADERBOARDS response from back-end', responseLeaderboardData.data);
  dispatch(addLeaderboardDataActionCreator(responseLeaderboardData.data));
};

export const getSummonerData = summonerName => async dispatch => {
  const responseSummData = await axios.get(`/${summonerName}`);
  console.log('SUMM response from back-end', responseSummData.data);
  dispatch(addSummonerDataActionCreator(responseSummData.data));
};

// asynchronous call to API to get info based on riot ID input
export const getValorantData = (riotID, tagLine) => async dispatch => {
  const responseValData = await axios.get(`/valorant/${riotID}/${tagLine}`);
  console.log('VAL response from back-end', responseValData.data);
  dispatch(addValorantDataActionCreator(responseValData.data));  
};

// asynchronous call to API to get info based on summonerName input
export const getTFTData = (summonerName) => async dispatch => {
  const responseTFTData = await axios.get(`/tft/${summonerName}`);
  console.log('TFT response from back-end', responseTFTData.data);
  dispatch(addTFTDataActionCreator(responseTFTData.data));
};

export const getChampionData = async (championName) => {
  return 'hi';
  // this response returns the champion Data
};
