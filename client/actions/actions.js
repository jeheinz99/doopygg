// import actionType constants
import axios from 'axios'
import * as types from '../constants/actionTypes';

// export actions and payloads
   
export const addSummonerMatchHistory = matchHistory => ({
  type: types.ADD_MATCH_HISTORY,
  payload: matchHistory
});

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

// asynchronous calls to get data before using synchronous actions

// asynchronous call to API to get info for top 25 NA players currently
export const getLeaderboardData = async () => {

  // this sends a get request to leaderboardRouter in server.js
  let responseLeaderboardData = await axios.get('/leaderboards');
  console.log('LEADERBOARDS response from back-end', responseLeaderboardData.data);
  return responseLeaderboardData.data;

};

// asynchronous call to API to get info based on summonerName input
export const getSummonerData = async (summonerName) => {

  // this sends a get request to summonerRouter in server.js
  let responseSummData = await axios.get(`/${summonerName}`);
  console.log('SUMM response from back-end', responseSummData.data);
  return responseSummData.data;

};

// asynchronous call to API to get info based on riot ID input
export const getValorantData = async (riotID, tagLine) => {

  // this sends a get request to valorantRouter in server.js
  let responseValData = await axios.get(`/valorant/${riotID}/${tagLine}`);
  console.log('VAL response from back-end', responseValData.data);
  return responseValData.data;
  
};

// asynchronous call to API to get info based on summonerName input
export const getTFTData = async (summonerName) => {

  // this sends a get request to TFTRouter in server.js
  let responseTFTData = await axios.get(`/tft/${summonerName}`);
  console.log('TFT response from back-end', responseTFTData.data);
  return responseTFTData.data;

};

export const getChampionData = async (championName) => {
  return 'hi';
  // this response returns the champion Data
};
