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

export const getSummonerData = async (summonerName) => {
    let response = await axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=RGAPI-338cbf85-ede0-4b14-b037-7be246c40e61`, 
    {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        "Origin": "https://developer.riotgames.com",
      }
    })
  const { data } = response 
  console.log(data);
// export const getSummonerData = async (summonerName) => {
//   let response = await axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/Doopliss2`, 
//   {
//     headers: {
//       "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
//       "Accept-Language": "en-US,en;q=0.9",
//       "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
//       "Origin": "https://developer.riotgames.com",
//       "Access-Control-Allow-Headers": "true",
//       "X-Riot-Token": "RGAPI-338cbf85-ede0-4b14-b037-7be246c40e61"
//     }
//   })
//   console.log(request);
  // const { summonerLevel, name, accountId  } = response;
  // const summonerData = [{
  //   summonerLevel: summonerLevel,
  //   name: name,
  //   accountId: accountId
  // }];
  // return summonerData;
};