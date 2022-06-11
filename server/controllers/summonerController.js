const summonerController = {};
const axios = require('axios');
const data = require('../data');
const { api_key } = data;
const db = require('../models/IconPaths');

// HELPER FUNCTIONS ---> USED TO GET DATA FROM SQL DATABASE FROM RIOT API DATA

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

// maps item icons for 6 items for player from ids from SQL DB
const mapItemIcons = async items => {
  const query = `SELECT id, path FROM items WHERE id IN (${items[0]}, ${items[1]}, ${items[2]}, ${items[3]}, ${items[4]}, ${items[5]}, ${items[6]})
  ORDER BY CASE id
  WHEN ${items[0]} then 1
  WHEN ${items[1]} then 2
  WHEN ${items[2]} then 3
  WHEN ${items[3]} then 4
  WHEN ${items[4]} then 5
  WHEN ${items[5]} then 6
  WHEN ${items[6]} then 7 
  end;`
  // console.log(query);
  const path = await db.query(query);
  const outputArr = [];
  for (let i = 0; i < items.length; i++) {
    for (let j = 0; j < path.rows.length; j++) {
      if (items[i] === path.rows[j].id) {
        outputArr.push(path.rows[j].path);
      }
    }
  }
  // console.log('output arr in func', outputArr);
  return outputArr;
};

// maps rune icons for keystone and secondary tree from ids from SQL DB
const mapRuneIcons = async runes => {
  const query = `SELECT id, path FROM runes WHERE id IN (${runes[0]}, ${runes[1]}, ${runes[2]}, ${runes[3]}, ${runes[4]}, ${runes[5]}, ${runes[6]}, ${runes[7]}, ${runes[8]}, ${runes[9]}, ${runes[10]})
  ORDER BY CASE id
  WHEN ${runes[0]} then 1
  WHEN ${runes[1]} then 2
  WHEN ${runes[2]} then 3
  WHEN ${runes[3]} then 4
  WHEN ${runes[4]} then 5
  WHEN ${runes[5]} then 6
  WHEN ${runes[6]} then 7
  WHEN ${runes[7]} then 8
  WHEN ${runes[8]} then 9
  WHEN ${runes[9]} then 10
  WHEN ${runes[10]} then 11
  end;`

  const path = await db.query(query);
  // console.log(path.rows, 'path after query');
  const outputArr = [];
  for (let i = 0; i < runes.length; i++) {
    for (let j = 0; j < path.rows.length; j++) {
      if (runes[i] === path.rows[j].id) {
        outputArr.push(path.rows[j].path);
      }
    }
  }
  // console.log('output arr in func', outputArr);
  return outputArr;
};

// maps summoner spell icons from ids from SQL DB
const mapSummonerIcons = async summSpells => {
  const query = `SELECT path FROM summonerspells WHERE id IN (${summSpells[0]}, ${summSpells[1]})
  ORDER BY CASE id
  WHEN ${summSpells[0]} then 1
  WHEN ${summSpells[1]} then 2
  end;`

  const path = await db.query(query);
  return [path.rows[0].path, path.rows[1].path];
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
            items: [player.item0, player.item1, player.item2, player.item3, player.item4, player.item5, player.item6],
            runes: [player.perks.styles[0].selections[0].perk, // keystone [0]
            player.perks.styles[0].selections[1].perk, // first rune in keystone tree [1]
            player.perks.styles[0].selections[2].perk, // second rune in keystone tree [2] 
            player.perks.styles[0].selections[3].perk, // third rune in keystone tree [3]
            player.perks.styles[0].style, // primary tree style [4]
            player.perks.styles[1].style, // secondary tree style (i.e. pic of green tree icon) [5]
            player.perks.styles[1].selections[0].perk, // secondary tree first rune [6]
            player.perks.styles[1].selections[1].perk,  // secondary tree second rune [7]
            player.perks.statPerks.defense, // stat shard row 1 [8]
            player.perks.statPerks.flex, // stat shard row 2 [9]
            player.perks.statPerks.offense], // stat shard row 3 [10]
          });
          otherPlayersData.push({
            championId: player.championId,
            summonerName: player.summonerName,
            kills: player.kills,
            deaths: player.deaths,
            assists: player.assists,
            win: player.win,
            turretKills: player.turretKills,
            teamBarons: player.challenges.teamBaronKills,
            dragons: player.dragonKills,
            goldEarned: player.goldEarned,
            visionScore: player.visionScore,
            cs: player.totalMinionsKilled,
            champDamage: player.totalDamageDealtToChampions,
            champLevel: player.champLevel,
            summonerSpells: [player.summoner1Id, player.summoner2Id],
            items: [player.item0, player.item1, player.item2, player.item3, player.item4, player.item5, player.item6],
            runes: [player.perks.styles[0].selections[0].perk,
            player.perks.styles[0].selections[1].perk,
            player.perks.styles[0].selections[2].perk,
            player.perks.styles[0].selections[3].perk,
            player.perks.styles[0].style,
            player.perks.styles[1].style,
            player.perks.styles[1].selections[0].perk,
            player.perks.styles[1].selections[1].perk,
            player.perks.statPerks.defense,
            player.perks.statPerks.flex,
            player.perks.statPerks.offense],
          });
        }
        else {
          const player = matchHistoryData[i].participants[j];
          otherPlayersData.push({
            championId: player.championId,
            summonerName: player.summonerName,
            kills: player.kills,
            deaths: player.deaths,
            assists: player.assists,
            win: player.win,
            turretKills: player.turretKills,
            teamBarons: player.challenges.teamBaronKills,
            dragons: player.dragonKills,
            goldEarned: player.goldEarned,
            visionScore: player.visionScore,
            cs: player.totalMinionsKilled,
            champDamage: player.totalDamageDealtToChampions,
            champLevel: player.champLevel,
            summonerSpells: [player.summoner1Id, player.summoner2Id],
            items: [player.item0, player.item1, player.item2, player.item3, player.item4, player.item5, player.item6],
            runes: [player.perks.styles[0].selections[0].perk,
            player.perks.styles[0].selections[1].perk,
            player.perks.styles[0].selections[2].perk,
            player.perks.styles[0].selections[3].perk,
            player.perks.styles[0].style,
            player.perks.styles[1].style,
            player.perks.styles[1].selections[0].perk,
            player.perks.styles[1].selections[1].perk,
            player.perks.statPerks.defense,
            player.perks.statPerks.flex,
            player.perks.statPerks.offense],
          });
        }
      };
    };

    const queueData = await axios.get('https://static.developer.riotgames.com/docs/lol/queues.json');

    // maps icons for main player being searched for
    for (let i = 0; i < matchHistoryData.length; i++) {

      const itemsMap = await mapItemIcons(matchesData[i].items); // 7 items total
      const runesMap = await mapRuneIcons(matchesData[i].runes); // 11 runes total
      const summSpellMap = await mapSummonerIcons(matchesData[i].summonerSpells); // 2 items total
      const queueMap = await mapQueueType(matchesData[i].gameMode, queueData);

      matchesData[i].gameMode = queueMap;
      matchesData[i].items = itemsMap;
      matchesData[i].runes = runesMap;
      matchesData[i].summonerSpells = summSpellMap;

    }

    // maps icons for other players
    for (let i = 0; i < otherPlayersData.length; i++) {

      const itemsMap = await mapItemIcons(otherPlayersData[i].items); // 7 items total
      const runesMap = await mapRuneIcons(otherPlayersData[i].runes); // 11 runes total
      const summSpellMap = await mapSummonerIcons(otherPlayersData[i].summonerSpells); // 2 items total

      otherPlayersData[i].items = itemsMap;
      otherPlayersData[i].runes = runesMap;
      otherPlayersData[i].summonerSpells = summSpellMap;

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