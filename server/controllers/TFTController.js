const TFTController = {};
const axios = require('axios');
const db = require('../models/IconPaths');
const tftSummoner = require('../models/TFTSummonerData');
const tftMatches = require('../models/TFTMatchesModel');
const queueData = require('../../queues.json');

// HELPER FUNCTIONS ---> USED TO GET DATA FROM SQL DATABASE FROM RIOT API DATA

// maps queue type based on queueId
const mapQueueType = queueId => {
  if (queueId === 1100) return 'Ranked TFT';
  else if (queueId === 1090) return 'Standard TFT';
  else if (queueId === 1160) return 'Double Up';
  
  // let str = '';
  // reverse iterate through the array because most queues are high numbers, lower ids are deprecated
  for (let i = queueData.length-1; i >= 0; i--) {
    if (queueId === queueData[i].queueId) {
      return queueData[i].description;
    }
  }
  return 'TFT';
};

// maps augment icon based on augment name passed in
const mapAugmentIcons = async augments => {
  const query = `SELECT path FROM tftaugments WHERE apiname IN ('${augments[0]}', '${augments[1]}', '${augments[2]}')
  ORDER BY CASE name
  WHEN '${augments[0]}' then 1
  WHEN '${augments[1]}' then 2
  WHEN '${augments[2]}' then 3
  end;`

  const path = await db.query(query);
  return [path.rows[0].path, path.rows[1].path, path.rows[2].path];
};

// maps little legend icon from id
const mapLittleLegendIcons = async legendId => {
  const query = `SELECT path FROM littlelegends WHERE id IN ('${legendId}')`;

  const path = await db.query(query);
  return path.rows[0].path;
};

// maps tft unit icons from name
const mapUnitIcons = async units => {

  const matchItemIcons = (items, queryRes) => {
    const tempArr = [];
    for (let i = 0; i < items.length; i++) {
      for (let j = 0; j < queryRes.length; j++) {
        if (items[i] === queryRes[j].id) {
          tempArr.push(queryRes[j].path);
        }
      }
    }
    return tempArr;
  };
  
  const unitsArr = [];
  const itemsArr = [];

  for (let i = 0; i < units.length; i++) {
    unitsArr.push(`'${units[i].character_id}'`);

    if (units[i].items.length > 0) {

      for (let j = 0; j < units[i].items.length; j++) {
        itemsArr.push(units[i].items[j]);
      }

    }
  }

  const query = `SELECT * FROM tftchamps WHERE apiname = any(array[${unitsArr}])`;
  const query2 = `SELECT * FROM tftitems WHERE id = any(array[${itemsArr}])`;
  const path = await db.query(query);
  const path2 = await db.query(query2);

  for (let i = 0; i < units.length; i++) {
    for (let j = 0; j < path.rows.length; j++) {
      if (units[i].character_id === path.rows[j].apiname) {
        units[i].unitIcon = path.rows[j].path;
      }
      if (units[i].items.length > 0) {
        units[i].itemIcons = matchItemIcons(units[i].items, path2.rows);
      }
    }
  }
  return units;
};

// maps trait icons from name
const mapTraitIcons = async traits => {
  const tempArr = [];
  for (let i = 0; i < traits.length; i++) {
    // if (traits[i].tier_current > 0) {
    tempArr.push(`'${traits[i].name}'`);
    // }
  }
  if (!tempArr.length) return [];
  const query = `SELECT * FROM traits WHERE apiname = any(array[${tempArr}])`;
  const path = await db.query(query);

  for (let i = 0; i < traits.length; i++) {
    for (let j = 0; j < path.rows.length; j++) {
      if (traits[i].name === path.rows[j].apiname) {
        traits[i].traitIcon = path.rows[j].path;
      }
    }
  }
  return traits;
};

// inits a region Obj to assign a platform routing value based on user inputted region
const regionObj = {
  "br1": "americas",
  "eun1": "europe",
  "euw1": "europe",
  "jp1": "asia",
  "kr": "asia",
  "la1": "americas",
  "la2": "americas",
  "na1": "americas",
  "oc1": "americas",
  "ru": "europe",
  "tr1": "europe",
};

// checks if tft summoner is found in database
TFTController.checkTFTSummData = async (req, res, next) => {
  const { summonerName, regionId } = req.params;
  try {
    const summoner = await tftSummoner.findOne({summonerName: { $regex : new RegExp(summonerName, "i")}, region: regionId});
    // const summoner = await tftSummoner.findOne({summonerName: summonerName, region: regionId});
    if (summoner !== null) {
      res.locals.TFTData = {
        summonerName: summoner.summonerName,
        summonerLevel: summoner.summonerLevel,
        summonerRank: summoner.summonerRank,
        puuid: summoner.puuid,
        region: summoner.region,
        summonerId: summoner.summonerId,
        accountId: summoner.accountId,
        summonerIcon: summoner.summonerIcon,
        TFTData: summoner.TFTMatchHistory,
        otherPlayersMatches: summoner.otherPlayersMatches,
        allMatchesPlayed: summoner.Set7MatchesPlayed,
        allMatchesPlayedData: summoner.S12MatchesPlayedData,
        lastUpdated: summoner.lastUpdated,
      };
      return next();
    }
    return next();
  }
  catch(err) {
    console.log('error in checkTFTSummData');
    return next(err);
  }
};

// if no data is found in checkTFTSummData or update button is pressed
TFTController.updateTFTSummData = async (req, res, next) => {

  if (res.locals.TFTData) {
    return next();
  }

  try {
    const { summonerName, regionId } = req.params;
    const regionRoute = regionObj[regionId];

    const getSummData = await axios.get(`https://${regionId}.api.riotgames.com/tft/summoner/v1/summoners/by-name/${encodeURI(summonerName)}?api_key=${process.env.dev_api_key}`,
    {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        "Origin": "https://developer.riotgames.com"
      }
    });

    const { data } = getSummData;
    const { puuid, profileIconId, summonerLevel, id, accountId, name } = data;

    const getRankData = await axios.get(`https://${regionId}.api.riotgames.com/tft/league/v1/entries/by-summoner/${id}?api_key=${process.env.dev_api_key}`,
    {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        "Origin": "https://developer.riotgames.com"
      }
    });

    const getRankData2 = await axios.get(`https://${regionId}.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${process.env.dev_api_key}`,
    {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        "Origin": "https://developer.riotgames.com"
      }
    });

    const rankData = {
      rankedSolo: [],
      doubleUp: [],
    };

    for (let i = 0; i < getRankData2.data.length; i++) {
      if (getRankData2.data[i].queueType === "RANKED_TFT_DOUBLE_UP") {
        rankData.doubleUp.push(getRankData2.data[i].tier);
        rankData.doubleUp.push(getRankData2.data[i].leaguePoints);
        rankData.doubleUp.push(getRankData2.data[i].rank);
      }
    }

    for (let i = 0; i < getRankData.data.length; i++) {
      if (getRankData.data[i].queueType === "RANKED_TFT") {
        rankData.rankedSolo.push(getRankData.data[i].tier);
        rankData.rankedSolo.push(getRankData.data[i].leaguePoints);
        rankData.rankedSolo.push(getRankData.data[i].rank);
      }
    }


    // returns a list of recent matches based on puuid 
    const getMatchList = await axios.get(`https://${regionRoute}.api.riotgames.com/tft/match/v1/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${process.env.dev_api_key}`,
    {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        "Origin": "https://developer.riotgames.com"
      }
    });

    const matchIdList = getMatchList.data;

    const matchData = [];
    for (let i = 0; i < matchIdList.length; i++) {
      // pings DB to findOne match based on the matchId
      const match = await tftMatches.findOne({matchId: matchIdList[i]});
      // if match returns null (doesn't exist in DB), ping API and then store it
      if (match === null) {
        const getMatchData = await axios.get(`https://${regionRoute}.api.riotgames.com/tft/match/v1/matches/${matchIdList[i]}?api_key=${process.env.dev_api_key}`,
        {
          headers: {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
            "Accept-Language": "en-US,en;q=0.9",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://developer.riotgames.com"
            }
        });
        await tftMatches.create({
          matchId: matchIdList[i],
          matchData: getMatchData.data.info,
        });
        matchData.push(getMatchData.data.info);
      }
      // if match doesn't return null, it is in DB 
      else {
        matchData.push(match.matchData);
      }
    };

    
    const TFTMatchHistory = [];
    const otherPlayersData = [];
    for (let i = 0; i < matchData.length; i++) {
      for (let j = 0;  j < matchData[i].participants.length; j++) {

        if (matchData[i].participants[j].puuid === puuid) {
          const player = matchData[i].participants[j];
          TFTMatchHistory.push({
            gameEnd: (matchData[i].game_datetime - Math.round(matchData[i].game_length)*1000),
            gameMode: matchData[i].queue_id,
            matchLength: matchData[i].game_length,
            setNumber: matchData[i].tft_set_number,
            augments: player.augments,
            companion: player.companion.content_ID,
            level: player.level,
            placement: player.placement,
            damageDealt: player.total_damage_to_players,
            traits: player.traits,
            units: player.units,
          });
          otherPlayersData.push({
            puuid: player.puuid,
            augments: player.augments,
            companion: player.companion.content_ID,
            level: player.level,
            placement: player.placement,
            damageDealt: player.total_damage_to_players,
            traits: player.traits,
            units: player.units,
            lastRound: player.last_round,
            goldLeft: player.gold_left
          });
        }
        else {
          const player = matchData[i].participants[j];
          otherPlayersData.push({
            puuid: player.puuid,
            augments: player.augments,
            companion: player.companion.content_ID,
            level: player.level,
            placement: player.placement,
            damageDealt: player.total_damage_to_players,
            traits: player.traits,
            units: player.units,
            lastRound: player.last_round,
            goldLeft: player.gold_left
          });
        }
      }
    }

    for (let i = 0; i < matchData.length; i++) {

      const augmentsMap = await mapAugmentIcons(TFTMatchHistory[i].augments);
      const littleLegendMap = await mapLittleLegendIcons(TFTMatchHistory[i].companion);
      const unitsMap = await mapUnitIcons(TFTMatchHistory[i].units);
      const traitsMap = await mapTraitIcons(TFTMatchHistory[i].traits);
      const queueMap = await mapQueueType(TFTMatchHistory[i].gameMode);

      TFTMatchHistory[i].traits = traitsMap;
      TFTMatchHistory[i].units = unitsMap;
      TFTMatchHistory[i].augments = augmentsMap;
      TFTMatchHistory[i].companion = littleLegendMap;
      TFTMatchHistory[i].gameMode = queueMap;

    };

    const set7MatchesArr = [];
    try {
      for (let i = 0; i < 2000; i+=100) {
        const getSet7AllMatches = await axios.get(`https://${regionRoute}.api.riotgames.com/tft/match/v1/matches/by-puuid/${puuid}/ids?start=${i}&startTime=1654646400&count=100&api_key=${process.env.dev_api_key}`,
        {
          headers: {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
            "Accept-Language": "en-US,en;q=0.9",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://developer.riotgames.com"
          }
        });

        // cannot access length property with getRankedS12Matches.data.length, so initialize temp variable
        const temp = getSet7AllMatches.data;
        set7MatchesArr.push(temp);

        if (temp.length !== 100) {
          await tftSummoner.findOneAndUpdate({summonerName: summonerName, region: regionId}, {Set7MatchesPlayed: set7MatchesArr});
          break;
        }
      }
    }
    catch(err) {
      console.log('err in getting all set7 matches');
      return next(err);
    }

    const TFTData = {
      summonerName: name,
      summonerLevel: summonerLevel,
      summonerRank: rankData,
      puuid: puuid,
      summonerId: id,
      accountId: accountId,
      TFTData: TFTMatchHistory,
      region: regionId,
      summonerIcon: profileIconId,
      otherPlayersMatches: otherPlayersData,
      allMatchesPlayed: set7MatchesArr,
      allMatchesPlayedData: [],
      lastUpdated: Date.now(),
    };

    const summoner = await tftSummoner.findOne({summonerName: name, region: regionId});

    if (summoner === null) {
      await tftSummoner.create({
        summonerName: name,
        summonerRank: rankData,
        summonerLevel: summonerLevel,
        summonerIcon: profileIconId,
        TFTMatchHistory: TFTMatchHistory,
        otherPlayersMatches: otherPlayersData,
        Set7MatchesPlayed: set7MatchesArr,
        puuid: puuid,
        region: regionId,
        summonerId: id,
        accountId: accountId,
        lastUpdated: Date.now(),
      });
    }

    else {
      await tftSummoner.findOneAndUpdate({summonerName: summonerName, region: regionId}, 
        {
          $set: {
            summonerName: name,
            summonerRank: rankData,
            summonerLevel: summonerLevel,
            summonerIcon: profileIconId,
            TFTMatchHistory: TFTMatchHistory,
            otherPlayersMatches: otherPlayersData,
            Set7MatchesPlayed: set7MatchesArr,
            puuid: puuid,
            region: regionId,
            summonerId: id,
            accountId: accountId,
            lastUpdated: Date.now(),
          }
        }
      );
    }
    res.locals.TFTData = TFTData;
    return next();
  } 
  catch(err) {
    console.log('error in TFTController at TFTData', err);
    return next(err);
  };
};

// gets TFT dropdown box data when dropdownbox is clicked
TFTController.getTFTDDBoxSummData = async (req, res, next) => {
  try {
    const { otherPlayers, regionId } = req.body;

    for (let i = 0; i < otherPlayers.length; i++) {
      const playerNameRes = await axios.get(`https://${regionId}.api.riotgames.com/tft/summoner/v1/summoners/by-puuid/${otherPlayers[i].puuid}?api_key=${process.env.dev_api_key}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
          "Accept-Language": "en-US,en;q=0.9",
          "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
          "Origin": "https://developer.riotgames.com"
          }
      });
      otherPlayers[i].name = playerNameRes.data.name;
    }

    for (let i = 0; i < otherPlayers.length; i++) {
      
      const augmentsMap = await mapAugmentIcons(otherPlayers[i].augments);
      const littleLegendMap = await mapLittleLegendIcons(otherPlayers[i].companion);
      const unitsMap = await mapUnitIcons(otherPlayers[i].units);
      const traitsMap = await mapTraitIcons(otherPlayers[i].traits);
      
      otherPlayers[i].traits = traitsMap;
      otherPlayers[i].units = unitsMap;
      otherPlayers[i].companion = littleLegendMap;
      otherPlayers[i].augments = augmentsMap;

    }

    res.locals.DDBoxData = otherPlayers;
    return next();
  }
  catch(err) {
    console.log(err, 'err in getDDBoxSummData');
    return next(err);
  }
};

TFTController.addTFTSummMatchesData = async (req, res, next) => {

  const { summonerName, allMatchesPlayed, region, puuid } = res.locals.TFTData;

  try {
    const summoner = await tftSummoner.findOne({"summonerName": { "$regex" : new RegExp(summonerName, "i")}, "region": region});
    // function to extract data from match objects that we do have
    const getObjData = (arrayOfObjs, puuid) => {
      const tempArr = [];
      // iterates through array of objects of matches we have in DB
      for (let i = 0; i < arrayOfObjs.length; i++) {
        // checks if the current match object is a ranked game
        if (arrayOfObjs[i].matchData.queue_id === 1100) {
          // iterates through all 8 players and checks if puuid matches
          for (let j = 0; j < arrayOfObjs[i].matchData.participants.length; j++) {
            if (arrayOfObjs[i].matchData.participants[j].puuid === puuid) {
              const player = arrayOfObjs[i].matchData.participants[j];
              tempArr.push({
                placement: player.placement,
              });
            }
          }
        }
      }
      return tempArr;
    };

    const set7MatchesInfoArr = [];
    // iterate through all set 7 matches and see matches that are ranked and cached in db
    for (let i = 0; i < allMatchesPlayed.length; i++) {
      const objs = await tftMatches.find({ matchId: { $in: [...summoner.Set7MatchesPlayed[i]]}});
      const objData = getObjData(objs, puuid);
      set7MatchesInfoArr.push(objData);
    }
    await tftSummoner.findOneAndUpdate({summonerName: summonerName, region: region}, {Set7MatchesPlayedData: set7MatchesInfoArr});
    res.locals.TFTData.allMatchesPlayedData = set7MatchesInfoArr;
    return next();
  }
  catch(err) {
    console.log(err, 'err in addTFTSummMatchData');
    return next(err);
  }
};

module.exports = TFTController;

// const playerNameRes = await axios.get(`https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-puuid/${matchData[i].participants[j].puuid}?api_key=${api_key}`,
// {
//   headers: {
//     "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
//     "Accept-Language": "en-US,en;q=0.9",
//     "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
//     "Origin": "https://developer.riotgames.com"
//     }
// });

// const playerName = playerNameRes.data.name;