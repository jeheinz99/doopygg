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

export const expandSummMatchHistoryActionCreator = matchHistoryData => ({
  type: types.EXPAND_SUMM_MATCH_HISTORY,
  payload: matchHistoryData
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
export const getSummonerData = (summonerName, region) => async dispatch => {
  // console.log(summonerName, 'summoner name inside actions');
  // console.log(region, 'region inside actions');
  if (summonerName === undefined) summonerName = document.getElementById('SearchBoxInput').value;
  const input = document.getElementById('SearchBoxInput');
  // const region = document.getElementById('region-select-btn').value;
  if (input !== null) {
    input.value = '';
    input.placeholder = 'Summoner Name';
  }
  const responseSummData = await axios.get(`/summoner/${region}/${summonerName}`);
  // console.log('SUMM response from back-end', responseSummData.data);
  dispatch(addSummonerDataActionCreator(responseSummData.data));
};
export const expandSummMatchHistory = (summonerName, historyLength, regionId) => async dispatch => {
  const responseSummExpandMatchHistory = await axios.get(`/summoner/history/${regionId}/${summonerName}/${historyLength}`);
  // console.log('SUMMONER EXPAND HISTORY response from back-end');
  dispatch(expandSummMatchHistoryActionCreator(responseSummExpandMatchHistory.data));
};
export const updateSummonerData = summonerName => async dispatch => {
  const region = document.getElementById('region-select-btn').value;
  const responseSummUpdateData = await axios.get(`/summoner/update/${region}/${summonerName}`);
  // console.log('SUMM UPDATE response from back-end', responseSummUpdateData.data);
  dispatch(addSummonerDataActionCreator(responseSummUpdateData.data));
};

export const getTFTData = summonerName => async dispatch => {
  const region = document.getElementById('region-select-btn').value;
  const input = document.getElementById('SearchBoxInputTFT');
  input.value = '';
  input.placeholder = 'Summoner Name';
  const responseTFTData = await axios.get(`/tft/${region}/${summonerName}`);
  // console.log('TFT response from back-end', responseTFTData.data);
  dispatch(addTFTDataActionCreator(responseTFTData.data));
};
export const updateTFTData = summonerName => async dispatch => {
  const region = document.getElementById('region-select-btn').value;
  const responseTFTUpdateData = await axios.get(`/tft/update/${region}/${summonerName}`);
  // console.log('TFT UPDATE response from back-end', responseTFTUpdateData.data);
  dispatch(addTFTDataActionCreator(responseTFTUpdateData.data));
};

export const getLeaderboardData = regionName => async dispatch => {
  const responseLeaderboardData = await axios.get(`/leaderboards/${regionName}`);
  // console.log('LEADERBOARDS response from back-end', responseLeaderboardData.data);
  dispatch(addLeaderboardDataActionCreator(responseLeaderboardData.data));
};

export const getValorantData = (riotID, tagLine) => async dispatch => {
  const input1 = document.getElementById('val-input-1');
  const input2 = document.getElementById('val-input-2');
  input1.value = '';
  input2.value = '';
  const responseValData = await axios.get(`/valorant/playerdata/na1/${riotID}/${tagLine}`);
  // console.log('VAL response from back-end', responseValData.data);
  dispatch(addValorantDataActionCreator(responseValData.data));  
};

export const getChampionData = () => async dispatch => {
  const region = document.getElementById('region-select').value;
  const queue = document.getElementById('queue-select').value;
  const tier = document.getElementById('tier-select').value;
  const division = document.getElementById('division-select').value;
  const responseChampData = await axios.get(`/champions/${region}/${queue}/${tier}/${division}`);
  // console.log('CHAMP TEST response from back-end', responseChampData.data);
  // dispatch(addChampionDataActionCreator(responseChampData.data));
};

export const testAsyncFunc = () => async dispatch => {
  const responseSummTestData = await axios.get(`/summoner/test`);
  // console.log('SUMM TEST response from back-end', responseSummTestData.data);
  // dispatch(addSummonerDataActionCreator(responseSummTestData.data));
};