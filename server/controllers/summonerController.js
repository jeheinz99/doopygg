const summonerController = {};
const axios = require('axios');
const data = require('../data');
const { api_key } = data;
const db = require('../models/IconPaths');
const lolSummoner = require('../models/summonerData');
const lolMatches = require('../models/LoLMatchesModel');

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
  const path = await db.query(query);
  const outputArr = [];
  for (let i = 0; i < items.length; i++) {
    for (let j = 0; j < path.rows.length; j++) {
      if (items[i] === path.rows[j].id) {
        outputArr.push(path.rows[j].path);
      }
    }
  }
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
  const outputArr = [];
  for (let i = 0; i < runes.length; i++) {
    for (let j = 0; j < path.rows.length; j++) {
      if (runes[i] === path.rows[j].id) {
        outputArr.push(path.rows[j].path);
      }
    }
  }
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

summonerController.checkSummData = async (req, res, next) => {

  const { summonerName } = req.params;

  try {
    const summoner = await lolSummoner.findOne({summonerName: summonerName});
    // if (summoner !== null && summoner.matchesPlayed[0]) {

    //   const newMatchesArr = [];
    //   for (let i = 0; i < summoner.matchesPlayed.length; i++) {
    //     for (let j = 0; j < summoner.matchesPlayed[i].length; j++) {
    //       const result = await lolMatches.findOne({matchId: summoner.matchesPlayed[i][j]});
    //       newMatchesArr.push(result);
    //     }
    //   }
    //   summoner.matchesPlayed = newMatchesArr;
    //   console.log(summoner.matchesPlayed);

      
    //   res.locals.summonerData = summoner;
    //   return next();
    // }

    if (summoner !== null) {
      res.locals.summonerData = summoner;
      return next();
    }

    return next();
  }
  catch(err) {
    console.log('error in checkSummData');
    return next(err);
  }
};

summonerController.updateSummData = async (req, res, next) => {

  const { summonerName } = req.params;

  // checks if res.locals.summonerData exists, if it does then just skips this controller -
  // determined by whether the user pressed 'search' or 'update'
  if (res.locals.summonerData) {
    return next();
  }

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
    let responseMatchData = await axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${api_key}`,
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
    
    const matchHistoryData = [];
    // iterates through the matchIdList of 10 match IDs and pushes the match data for each match to a new array matchHistoryData
    console.log(matchIdList);
    // for (let i = 0; i < matchIdList.length; i++) {
      // pings DB to findOne match based on the matchId
      const match = await lolMatches.findOne({matchId: 'NA1_4330809504'});
      console.log(match);
      // if match returns null (doesn't exist in DB), ping API and then store it
      if (match === null) {
        const responseMatchHistory = await axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchIdList[i]}?api_key=${api_key}`,
        {
          headers: {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
            "Accept-Language": "en-US,en;q=0.9",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://developer.riotgames.com"
            }
        });
        await lolMatches.create({
          matchId: matchIdList[i],
          matchData: responseMatchHistory.data.info,
        });
        matchHistoryData.push(responseMatchHistory.data.info);
      }
      // if match doesn't return null, it is in DB 
      else {
        matchHistoryData.push(match.matchData);
      }
    // }

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
            // teamBarons: player.challenges.teamBaronKills,
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
            // teamBarons: player.challenges.teamBaronKills,
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

      // const itemsMap = await mapItemIcons(matchesData[i].items); // 7 items total
      // const runesMap = await mapRuneIcons(matchesData[i].runes); // 11 runes total
      // const summSpellMap = await mapSummonerIcons(matchesData[i].summonerSpells); // 2 items total
      // const queueMap = await mapQueueType(matchesData[i].gameMode, queueData);

      // matchesData[i].gameMode = queueMap;
      // matchesData[i].items = itemsMap;
      // matchesData[i].runes = runesMap;
      // matchesData[i].summonerSpells = summSpellMap;

    }

    // maps icons for other players
    for (let i = 0; i < otherPlayersData.length; i++) {

      // const itemsMap = await mapItemIcons(otherPlayersData[i].items); // 7 items total
      // const runesMap = await mapRuneIcons(otherPlayersData[i].runes); // 11 runes total
      // const summSpellMap = await mapSummonerIcons(otherPlayersData[i].summonerSpells); // 2 items total

      // otherPlayersData[i].items = itemsMap;
      // otherPlayersData[i].runes = runesMap;
      // otherPlayersData[i].summonerSpells = summSpellMap;

    }

    const allS12MatchesArr = [];

    try {

      for (let i = 0; i < 2000; i+=100) {
        const getRankedS12Matches = await axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?startTime=1641531600&queue=420&type=ranked&start=${i}&count=100&api_key=${api_key}`,
        {
          headers: {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
            "Accept-Language": "en-US,en;q=0.9",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://developer.riotgames.com"
          }
        });

        allS12MatchesArr.push(getRankedS12Matches.data);

        if (getRankedS12Matches.data.length !== 100) {
          await lolSummoner.findOneAndUpdate({summonerName: summonerName}, {matchesPlayed: allS12MatchesArr});
          break;
        }
      }
    }
    catch(err) {
      console.log('err in getting all s12 ranked matches');
      return next(err);
    }

    const summonerData = {
      summonerName: responseSummData.data.name,
      summonerLevel: responseSummData.data.summonerLevel,
      summonerRank: rankData,
      profileIcon: responseSummData.data.profileIconId,
      matchHistory: matchesData,
      otherPlayersMatches: otherPlayersData,
    };

    const summoner = await lolSummoner.findOne({summonerName: summonerName});

    if (summoner === null) {
      await lolSummoner.create({
        summonerName: summonerName,
        puuid: puuid,
        summonerRecentData: summonerData,
      });
    }
    else {
      await lolSummoner.findOneAndUpdate({summonerName: summonerName}, {summonerRecentData: summonerData});
    }

    res.locals.summonerData = summonerData;
    return next();
  }
  catch(err) {
    console.log('error in summonerController at summData', err);
    return next(err);
  }
};

summonerController.addSummData = async (req, res, next) => {
  if (!res.locals.foundSummData) {

    try {

      const { summonerName, matchesPlayed } = res.locals.checkSummData;

      const matchesDataArr = [];

      // for (let i = 0; i < matchesPlayed.length; i++) {

        // can only get last 50 games because of rate limits per api key
        for (let j = 0; j < (matchesPlayed[0].length / 2); j++) {
          let matchResponse = await axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchesPlayed[0][j]}?api_key=${api_key}`,
          {
            headers: {
              "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
              "Accept-Language": "en-US,en;q=0.9",
              "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
              "Origin": "https://developer.riotgames.com"
            }
          });
          console.log(j, `match number ${j}`);
          matchesDataArr.push(matchResponse.data.info);
        }
      // }

      await lolSummoner.findOneAndUpdate({summonerName: summonerName}, {matchesData: matchesDataArr});
      const summTest = await lolSummoner.findOne({summonerName: summonerName});
      res.locals.recentSummoner = summTest;
      return next();
    }
    catch(err) {
      console.log('error in adding summoner data', err);
      return next(err);
    }
  }
  // if we find summoner in checkSumm controller, set it to the output locals to the front-end
  res.locals.recentSummoner = res.locals.foundSummData;
  return next();
};

module.exports = summonerController;

// const { matchesPlayed } = summoner;

// let ms = 1300;
// const tempArr = [];
// const timeout = ms => {
//   return new Promise(resolve => setTimeout(resolve, ms));
// };
// const apiCall = async matchesPlayed => {
//   for (let i = 0; i < matchesPlayed.length; i++) {
//     for (let j = 0; j < matchesPlayed[i].length; j++) {
//       const match = await lolMatches.findOne({matchId: matchesPlayed[i][j]});
//       if (match === null) {
//         const getMatchObj = await axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/NA1_4326617754?api_key=RGAPI-0819602b-05b5-488c-aaa4-b6657496a9c2`,
//         {
//           headers: {
//             "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
//             "Accept-Language": "en-US,en;q=0.9",
//             "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
//             "Origin": "https://developer.riotgames.com"
//           }
//         });
//         await lolMatches.create({
//           matchId: matchesPlayed[i][j],
//           matchData: getMatchObj.data.info,
//         });
//         tempArr.push(getMatchObj.data.info);
//         console.log(`match obj ${j}`);
//         await timeout(ms);
//       }
//       else {
//         tempArr.push(match.matchData);
//         console.log(`match obj ${j}`);
//         await timeout(ms);
//       }
//     }
//   }
// }
// const result = await apiCall(matchesPlayed);