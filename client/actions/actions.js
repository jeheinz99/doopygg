// import actionType constants
import axios from 'axios'
import * as types from '../constants/actionTypes';

// export actions and payloads

export const addSummonerDataActionCreator = summonerData => ({
  type: types.ADD_SUMMONER_DATA,
  payload: summonerData
});

export const addSummChampDataActionCreator = summChampData => ({
  type: types.ADD_SUMM_CHAMP_DATA,
  payload: summChampData
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
export const getLeaderboardData = regionName => async dispatch => {
  const responseLeaderboardData = await axios.get(`/leaderboards/${regionName}`);
  // console.log('LEADERBOARDS response from back-end', responseLeaderboardData.data);
  dispatch(addLeaderboardDataActionCreator(responseLeaderboardData.data));
};

export const getSummonerData = summonerName => async dispatch => {
  document.getElementById('SearchBoxInput').value = '';
  document.getElementById('SearchBoxInput').placeholder = `Summoner Name`;
  const responseSummData = await axios.get(`/summoner/${summonerName}`);
  // console.log('SUMM response from back-end', responseSummData.data);
  dispatch(addSummonerDataActionCreator(responseSummData.data));
};

export const updateSummonerData = summonerName => async dispatch => {
  const responseSummUpdateData = await axios.get(`/summoner/update/${summonerName}`);
  // console.log('SUMM UPDATE response from back-end', responseSummUpdateData.data);
  dispatch(addSummonerDataActionCreator(responseSummUpdateData.data));
};

export const getValorantData = (riotID, tagLine) => async dispatch => {
  const responseValData = await axios.get(`/valorant/${riotID}/${tagLine}`);
  // console.log('VAL response from back-end', responseValData.data);
  dispatch(addValorantDataActionCreator(responseValData.data));  
};

export const getTFTData = summonerName => async dispatch => {
  const responseTFTData = await axios.get(`/tft/${summonerName}`);
  // console.log('TFT response from back-end', responseTFTData.data);
  dispatch(addTFTDataActionCreator(responseTFTData.data));
};

export const updateTFTData = summonerName => async dispatch => {
  const responseTFTUpdateData = await axios.get(`/tft/update/${summonerName}`);
  // console.log('TFT UPDATE response from back-end', responseTFTUpdateData.data);
  dispatch(addSummonerDataActionCreator(responseTFTUpdateData.data));
};

export const getChampionData = championName => async dispatch => {
  return 'hi';
  // this response returns the champion Data
};

export const testAsyncFunc = () => async dispatch => {
  const responseSummTestData = await axios.get(`/summoner/test`);
  // console.log('SUMM TEST response from back-end', responseSummTestData.data);
  // dispatch(addSummonerDataActionCreator(responseSummTestData.data));
};