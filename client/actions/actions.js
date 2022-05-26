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

// asynchronous call to API to get info based on summonerName input
export const getSummonerData = async (summonerName) => {
  // need new api key every day
  const api_key = 'RGAPI-a5ec742f-6e38-4703-9a34-8a746d6bb1b0'
  // this response returns the summoner's name and level
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
  let responseMatchData = await axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5&api_key=${api_key}`,
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

  // console.log(responseRankData);
  const rankData = [responseRankData.data[0].tier, responseRankData.data[0].leaguePoints, responseRankData.data[1].tier, responseRankData.data[1].leaguePoints];

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

  /* 
  iterates through the matchHistoryData list to find the summoner being-
  looked up so you only find their statistics for each match and push an object 
  with statistics from the last 10 matches 
  */

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
  // console.log(summonerData);
  return summonerData;
};