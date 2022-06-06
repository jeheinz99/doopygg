const summonerController = {};
const axios = require('axios');
const api_key = 'RGAPI-1ced6ff3-f1ea-4e3d-8e05-3c378cddb138';

// const getItemIcons = async (itemsArr) => {
//   const getItemData = await axios.get('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/items.json');
//   const outputArr = [];

//   // no check for id of 0 in the json array if there is no item
//   for (let i = 0; i < itemsArr.length; i++) {
//     if (itemsArr[i] === 0) {
//       outputArr.push(0);
//     }
//   }

//   try {
//     // we know when to stop checking when we find all 7 items, outputArr will have a length of 7
//     while (outputArr.length < 6) {
//         // for each match, iterates through the item data array
//         for (let i = 0; i < getItemData.data.length; i++) {
//           // at each point in the array, check if the current index matches
//           for (let j = 0; j < itemsArr.length; j++) {
//             console.log(itemsArr[j], 'inside function, itemsArr[j]');
//             console.log(getItemData.data[i].id, 'inside function, getItemData.data[i].id');
//             // if the current index matches, push the value to a new output array
//             if (itemsArr[j].item === getItemData.data[i].id) {
//               // delcare a temp string to get icon path
//               let tempStr = getItemData.data[i].iconPath
//               // lowercase and replace the endpoint
//               tempStr = tempStr.toLowerCase().replace('/lol-game-data/assets/', '');
//               matchesData[i].item0 = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/${tempStr}`;
//               outputArr.push(matchesData[i]);
//             }
//           }
//         }
//       }
//     return outputArr;
//     }
//   catch(err) {
//     console.log('error in getItemIcons', err);
//   }
// };

// middleware to retrieve data for summoner search on home page
summonerController.summData = async (req, res, next) => {

  const { summonerName } = req.params;

  try {

    let responseSummData = await axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${api_key}`, 
    {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        "Origin": "https://developer.riotgames.com",
      }
    });

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
    // console.log('in back-end', matchHistoryData);
    const matchesData = [];

    for (let i = 0; i < matchHistoryData.length; i++) {
      for (let j = 0; j < 10; j++) {
        if (matchHistoryData[i].participants[j].summonerName === summonerName) {
          const player = matchHistoryData[i].participants[j];
          matchesData.push({
            championId: player.championId,
            summonerIcon: player.profileIcon,
            kills: player.kills,
            deaths: player.deaths,
            assists: player.assists,
            matchLength: `${matchHistoryData[i].gameDuration}`,
            gameMode: matchHistoryData[i].queueId,
            champion: player.championName,
            win: player.win,
            statShardDefense: player.perks.statPerks.defense,
            statShardFlex: player.perks.statPerks.flex, 
            statShardOffense: player.perks.statPerks.offense,
            keystone: player.perks.styles[0].selections[0].perk,
            secondaryRuneTree: player.perks.styles[1].style,
            // items: [player.item0, player.item1, player.item2, player.item3, player.item4, player.item5, player.item6],
          });
        };
      };
    };

    // WIP GETTING ICONS FOR ITEMS

    // for (let i = 0; i < matchHistoryData.length; i++) {
    //   console.log('matchesData.items BEFORE function', matchesData[i].items);
    //   let result = await getItemIcons(matchesData[i].items);
    //   matchesData[i].items = result;
    //   console.log('matchesData.items AFTER function', matchesData[i].items);
    // }
    
    const getRuneData = await axios.get('http://ddragon.leagueoflegends.com/cdn/12.10.1/data/en_US/runesReforged.json');

    for (let k = 0; k < matchHistoryData.length; k++) {
      // for each match, iterates through the rune data array
      for (let i = 0; i < getRuneData.data.length; i++) {
        // iterates through each of the 3-4 possible keystone/rune choices
        for (let j = 0; j < getRuneData.data[i].slots[0].runes.length; j++) {
          // console.log(getRuneData.data[i].slots[0].runes[j].id, `${i}`);
          // checks our keystone ID to match file path
          if (matchesData[k].keystone === getRuneData.data[i].slots[0].runes[j].id) {
            matchesData[k].keystone = `https://ddragon.leagueoflegends.com/cdn/img/${getRuneData.data[i].slots[0].runes[j].icon}`;
          }
          // checks our secondary rune tree ID to match file path
          if (matchesData[k].secondaryRuneTree === getRuneData.data[i].id) {
            matchesData[k].secondaryRuneTree = `https://ddragon.leagueoflegends.com/cdn/img/${getRuneData.data[i].icon}`;
          }
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
    // console.log('summonerData back-end', summonerData);
    res.locals.summonerData = summonerData;
    next();
  }
  catch(err) {
    console.log('error in summonerController at summData', err);
    next(err);
  };
};

module.exports = summonerController;