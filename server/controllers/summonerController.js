const summonerController = {};
const axios = require('axios');
const data = require('../data');
const { api_key } = data;

// HELPER FUNCTIONS ---> USED TO GET DATA FROM JSON OBJECTS FROM RIOT API DATA

const mapStatShards = (shard, statShardsData) => {

  let str = '';

  for (let i = 0; i < statShardsData.data.length; i++) {
    if (shard === statShardsData.data[i].id) {
      str = statShardsData.data[i].iconPath;
      str = str.toLowerCase().replace('/lol-game-data/assets/', '');
      return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/${str}`;
    }
  }
};

// maps queue type based on queueId
const mapQueueType = (queueId, queueData) => {
  let str = '';
  // reverse iterate through the array because most queues are high numbers, lower ids are deprecated
  for (let i = queueData.data.length-1; i >= 0; i--) {
    if (queueId === queueData.data[i].queueId) {
      str = queueData.data[i].description;
      str = str.replace(' games', '');
      return str;
    }
  }
};

// maps item icons for 6 items for player from ids
const mapItemIcons = (item, itemsData) => {

  let str = '';
  if (item === 0) {
    return 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/-1.png';
  }
  // list is sorted, checks if the ID of the item is higher or lower than the middle object id
  if (item < itemsData.data[(itemsData.data.length / 2).toFixed(0)].id) {
    // if it is lower, iterate from the start
    for (let i = 0; i < itemsData.data.length; i++) {
      if (item === itemsData.data[i].id) {
        str = itemsData.data[i].iconPath;
        str = str.toLowerCase().replace('/lol-game-data/assets/', '');
        return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/${str}`;
      }
    }
  }
  else {
    // otherwise, iterate from the end of the array 
    for (let i = itemsData.data.length-1; i >= 0; i--) {
      if (item === itemsData.data[i].id) {
        str = itemsData.data[i].iconPath;
        str = str.toLowerCase().replace('/lol-game-data/assets/', '');
        return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/${str}`;
      }
    }
  }
};

// maps rune icons for keystone and secondary tree from ids
const mapRuneIcons = (rune, runeData) => {
  let str = '';

  for (let i = 0; i < runeData.data.length; i++) {
    for (let j = 0; j < runeData.data[i].slots[0].runes.length; j++) {

      if (rune === runeData.data[i].id) {
        str = runeData.data[i].icon;
        return `https://ddragon.leagueoflegends.com/cdn/img/${str}`;
      }
      else if (rune === runeData.data[i].slots[0].runes[j].id) {
        str = runeData.data[i].slots[0].runes[j].icon;
        return `https://ddragon.leagueoflegends.com/cdn/img/${str}`;
      }
      
    }
  }
};

// maps summoner spell icons from ids
const mapSummonerIcons = (summSpell, summSpellData) => {
  let str = '';

  for (let i = 0; i < summSpellData.data.length; i++) {
    if (summSpell === summSpellData.data[i].id) {
      str = summSpellData.data[i].iconPath;
      str = str.toLowerCase().replace('/lol-game-data/assets/', '');
      return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/${str}`;
    }
  }
};

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
    
    // const matchHistoryTimes = [];
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
      // let responseMatchHistoryTimeline = await axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchIdList[i]}/timeline?api_key=${api_key}`,
      // {
      //   headers: {
      //     "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
      //     "Accept-Language": "en-US,en;q=0.9",
      //     "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
      //     "Origin": "https://developer.riotgames.com"
      //     }
      //   });
      // console.log(responseMatchHistoryTimeline.data.info.frames[0].events[0].realTimestamp, 'unix timestamp for game creation date');
      // matchHistoryTimes.push(responseMatchHistoryTimeline.data.info.frames[0].events[0].realTimestamp);
    }

    // iterates through the matchHistoryData list to find the summoner being-
    // looked up so you only find their statistics for each match and push an object 
    // with statistics from the last 10 matches 
    const matchesData = [];
    const otherPlayersData = [];

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
            visionScore: player.visionScore,
            cs: player.totalMinionsKilled,
            champDamage: player.totalDamageDealtToChampions,
            champLevel: player.champLevel,
            summonerSpells: [player.summoner1Id, player.summoner2Id],
            statShards: [player.perks.statPerks.defense, player.perks.statPerks.flex, player.perks.statPerks.offense],
            items: [player.item0, player.item1, player.item2, player.item3, player.item4, player.item5, player.item6],
            runes: [player.perks.styles[0].selections[0].perk, player.perks.styles[1].style]
          });
        }
        else {
          const player = matchHistoryData[i].participants[j];
          otherPlayersData.push({
            championId: player.championId,
            summonerName: player.summonerName,
          });
        }
      };
    };

    const runeData = await axios.get('http://ddragon.leagueoflegends.com/cdn/12.10.1/data/en_US/runesReforged.json');
    const summSpellData = await axios.get('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/summoner-spells.json');
    const itemsData = await axios.get('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/items.json');
    const statShardsData = await axios.get('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perks.json');
    const queueData = await axios.get('https://static.developer.riotgames.com/docs/lol/queues.json');

    for (let i = 0; i < matchHistoryData.length; i++) {

      const runesMap = await Promise.all(matchesData[i].runes.map(rune => mapRuneIcons(rune, runeData)));
      const summSpellMap = await Promise.all(matchesData[i].summonerSpells.map(summSpell => mapSummonerIcons(summSpell, summSpellData)));
      const itemsMap = await Promise.all(matchesData[i].items.map(item => mapItemIcons(item, itemsData)));
      const statShardsMap = await Promise.all(matchesData[i].statShards.map(shard => mapStatShards(shard, statShardsData)));
      const queueMap = await mapQueueType(matchesData[i].gameMode, queueData);

      matchesData[i].statShards = statShardsMap;
      matchesData[i].gameMode = queueMap;
      matchesData[i].items = itemsMap;
      matchesData[i].runes = runesMap;
      matchesData[i].summonerSpells = summSpellMap;

    }

    // console.log(matchesData[0].gameMode, 'gameMode back end after iteration');
    // console.log(matchesData[0].statShards, 'statShards back end after iteration');
    // console.log(matchesData[0].runes, 'runes back end after iteration');
    // console.log(matchesData[0].summonerSpells, 'summSpells back end after iteration');
    // console.log(matchesData[0].items, 'items back end after iteration');


    const summonerData = {
      summonerName: responseSummData.data.name,
      summonerLevel: responseSummData.data.summonerLevel,
      summonerRank: rankData,
      profileIcon: responseSummData.data.profileIconId,
      matchHistory: matchesData,
      otherPlayersMatches: otherPlayersData, 
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