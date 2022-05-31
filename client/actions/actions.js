// import actionType constants
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

//   let responseSummData = await axios.get(`/`);
//   console.log(responseSummData);
// };

  let responseSummData = await axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${api_key}`, 
  {
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
      "Accept-Language": "en-US,en;q=0.9",
      "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
      "Origin": "https://developer.riotgames.com",
    }
  });

  // logs first API call using summoner name
  // console.log(responseSummData);

  const { data } = responseSummData;
  const { puuid } = data;
  
  // uses summoner's puuid to get summoner's match history list of past 10 games to an array
  let responseMatchData = await axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${api_key}`,
  {
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
      "Accept-Language": "en-US,en;q=0.9",
      "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
      "Origin": "https://developer.riotgames.com"
    }
  });

  // list of match IDs in an array
  const matchIdList = responseMatchData.data;
  
  // summonerId from first API request used to get rank information
  const summonerId = responseSummData.data.id;

  let responseRankData = await axios.get(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${api_key}`,
  {
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
      "Accept-Language": "en-US,en;q=0.9",
      "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
      "Origin": "https://developer.riotgames.com"
    }
  });

  console.log(responseRankData.data);

  // checks to see if 1 of the 2 arrays returned are for ranked solo or ranked flex
  const rankData = [];
  for (let i = 0; i < responseRankData.data.length; i++) {
    if (responseRankData.data[i].queueType === "RANKED_SOLO_5x5") {
      rankData.push(responseRankData.data[i].tier);
      rankData.push(responseRankData.data[i].leaguePoints); 
    }
  }
  // logs 2nd API call using puuid
  // console.log(responseMatchData);

  const matchHistoryData = [];
  
  // iterates through the matchIdList of 10 match IDs and pushes the match data for each match to a new array matchHistoryData
  for (let i = 0; i < matchIdList.length; i++) {
    let responseMatchHistory = await axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchIdList[i]}?api_key=${api_key}`,
    {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        "Origin": "https://developer.riotgames.com"
        }
      });
    matchHistoryData.push(responseMatchHistory.data.info);
  }


  // iterates through the matchHistoryData list to find the summoner being-
  // looked up so you only find their statistics for each match and push an object 
  // with statistics from the last 10 matches 


  // logs third API call using array of matches 
  // console.log(matchHistoryData);

  const matchesData = [];

  for (let i = 0; i < matchHistoryData.length; i++) {
    for (let j = 0; j < 10; j++) {
      if (matchHistoryData[i].participants[j].summonerName === summonerName) {
        const player = matchHistoryData[i].participants[j];
        matchesData.push({
          summonerIcon: player.profileIcon,
          kills: player.kills,
          deaths: player.deaths,
          assists: player.assists,
          matchLength: `${matchHistoryData[i].gameDuration}`,
          gameMode: matchHistoryData[i].gameMode,
          champion: player.championName,
          win: player.win,
        });
      };
    };
  };

  const summonerData = {
    summonerName: responseSummData.data.name,
    summonerLevel: responseSummData.data.summonerLevel,
    summonerRank: rankData,
    profileIcon: responseSummData.data.profileIconId,
    matchHistory: matchesData, 
  }
  console.log(summonerData);
  return summonerData;
};

// asynchronous call to API to get info based on riot ID input
export const getValorantData = async (riotID, tagLine) => {

  // this response returns valorant player data
  const idDataResponse = await axios.get(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${riotID}/${tagLine}?api_key=${api_key}`,
  {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
      "Accept-Language": "en-US,en;q=0.9",
      "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
      "Origin": "https://developer.riotgames.com"
    }
  });
  console.log(idDataResponse);
  
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
