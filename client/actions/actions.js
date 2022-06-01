// import actionType constants
import { NextWeek } from '@material-ui/icons';
import axios from 'axios'
import * as types from '../constants/actionTypes';
import { api_key } from './api_key';

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
export const getLeaderboardData = async (leaderboard) => {

  // async call to API to get summonerName, tier, wins/losses, leaguePoints about top 25 Challengers in N/A
  const leaderboardDataResponse = await axios.get(`https://na1.api.riotgames.com/lol/league-exp/v4/entries/RANKED_SOLO_5x5/CHALLENGER/I?page=1&api_key=${api_key}`,
  {
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
      "Accept-Language": "en-US,en;q=0.9",
      "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
      "Origin": "https://developer.riotgames.com"
    }
  });
  
  const { data } = leaderboardDataResponse;
  console.log(data);
  
  // async call to API using summonerId from first call to get profile icon
  const profileIconArr = [];
  for (let i = 0; i < 25; i++) {
    const { summonerId } = data[i];
    console.log(summonerId);
  const leaderboardDataResponseTwo = await axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/${summonerId}?api_key=${api_key}`,
  {
    headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        "Origin": "https://developer.riotgames.com"
    }
  });

  profileIconArr.push(leaderboardDataResponseTwo.data.profileIconId);

  }
  const leaderboardDataArray = [];
  for (let i = 0; i < 25; i++) {
    const player = data[i];
    leaderboardDataArray.push({
      summonerName: player.summonerName,
      summonerRank: player.tier,
      leaguePoints: player.leaguePoints,
      wins: player.wins,
      losses: player.losses,
      profileIcon: profileIconArr[i],
    });
  };

  const leaderboardData = {
    leaderboardData: leaderboardDataArray,
    profileIcon: profileIconArr,
  };
  // console.log(leaderboardData);
  return leaderboardData;
}

export const getChampionData = async (championName) => {
  return 'hi';
  // this response returns the champion Data
};

// asynchronous call to API to get info based on summonerName input
export const getSummonerData = async (summonerName) => {

  // this sends a get request to the back-end
  let responseSummData = await axios.get(`/${summonerName}`);
  console.log('SUMM response from back-end', responseSummData.data)
  return responseSummData.data;
};

// asynchronous call to API to get info based on riot ID input
export const getValorantData = async (riotID, tagLine) => {
  try {
  let responseValData = await axios.get(`/valorant/${riotID}/${tagLine}`);
  console.log('VAL response from back-end', responseValData.data)
  return responseValData.data;
  }
  catch(err) {
    return;
  }
  
};

// asynchronous call to API to get info based on summonerName input
export const getTFTData = async (summonerName) => {

  const getSummData = await axios.get(`https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${summonerName}?api_key=${api_key}`,
  {
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
      "Accept-Language": "en-US,en;q=0.9",
      "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
      "Origin": "https://developer.riotgames.com"
    }
  });
  
  const { data } = getSummData;
  const { puuid } = data;
  const { profileIconId } = data;
  // returns a list of recent matches based on puuid 
  const getMatchList = await axios.get(`https://americas.api.riotgames.com/tft/match/v1/matches/by-puuid/${puuid}/ids?start=0&count=5&api_key=${api_key}`,
  {
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
      "Accept-Language": "en-US,en;q=0.9",
      "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
      "Origin": "https://developer.riotgames.com"
    }
  });

  const matchIdList = getMatchList.data;
  // console.log(matchIdList);

  const matchData = [];
  for (let i = 0; i < matchIdList.length; i++) {

    const getMatchData = await axios.get(`https://americas.api.riotgames.com/tft/match/v1/matches/${matchIdList[i]}?api_key=${api_key}`,
    {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        "Origin": "https://developer.riotgames.com"
        }
    });
    matchData.push(getMatchData.data.info)
  };
  const TFTMatchHistory = [];
  for (let i = 0; i < matchData.length; i++) {
    for (let j = 0; j < 8; j++) {
      if (matchData[i].participants[j].puuid === puuid) {
        const player = matchData[i].participants[j];
        TFTMatchHistory.push({
          matchLength: matchData[i].game_length,
          setNumber: matchData[i].tft_set_number,
          augments: player.augments,
          companion: player.companion,
          level: player.level,
          placement: player.placement,
          damageDealt: player.total_damage_to_players,
          traits: player.traits,
          units: player.units,
        });
      }
    }
  };
  const TFTData = {
    TFTData: TFTMatchHistory,
    summonerName: summonerName,
    summonerIcon: profileIconId,
  }
  return TFTData;
};
