const TFTController = {};
const axios = require('axios');
const db = require('../models/IconPaths');
const tftSummoner = require('../models/TFTSummonerData');
const tftMatches = require('../models/TFTMatchesModel');


const mapAugmentIcons = async augments => {
  const query = `SELECT path FROM tftaugments WHERE name IN ('${augments[0]}', '${augments[1]}', '${augments[2]}')
  ORDER BY CASE name
  WHEN '${augments[0]}' then 1
  WHEN '${augments[1]}' then 2
  WHEN '${augments[2]}' then 3
  end;`

  const path = await db.query(query);
  return [path.rows[0].path, path.rows[1].path, path.rows[2].path];
};

const mapLittleLegendIcons = async legendId => {
  const query = `SELECT path FROM littlelegends WHERE id IN ('${legendId}')`;

  const path = await db.query(query);
  return path.rows[0].path;
};

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

  const query = `SELECT * FROM tftchamps WHERE name = any(array[${unitsArr}])`;
  const query2 = `SELECT * FROM tftitems WHERE id = any(array[${itemsArr}])`;
  const path = await db.query(query);
  console.log(path.rows, 'path.rows');
  const path2 = await db.query(query2);

  for (let i = 0; i < units.length; i++) {
    for (let j = 0; j < path.rows.length; j++) {
      if (units[i].character_id === path.rows[j].name) {
        units[i].unitIcon = path.rows[j].path;
      }
      if (units[i].items.length > 0) {
        units[i].itemIcons = matchItemIcons(units[i].items, path2.rows);
      }
    }
  }
  return units;
};

const mapTraitIcons = async traits => {

  const tempArr = [];
  for (let i = 0; i < traits.length; i++) {
    if (traits[i].tier_current > 0) {
      tempArr.push(`'${traits[i].name}'`);
    }
  }

  const query = `SELECT * FROM traits WHERE name = any(array[${tempArr}])`;
  const path = await db.query(query);

  for (let i = 0; i < traits.length; i++) {
    for (let j = 0; j < path.rows.length; j++) {
      if (traits[i].name === path.rows[j].name) {
        traits[i].traitIcon = path.rows[j].path;
      }
    }
  }
  return traits;
};

TFTController.checkTFTSummData = async (req, res, next) => {

  const { summonerName } = req.params;
  
  try {
    const summoner = await tftSummoner.findOne({summonerName: summonerName});

    if (summoner !== null) {
      res.locals.TFTData = {
        summonerName: summoner.summonerName,
        summonerLevel: summoner.summonerLevel,
        summonerRank: summoner.summonerRank,
        summonerIcon: summoner.summonerIcon,
        profileIcon: summoner.profileIcon,
        TFTData: summoner.TFTMatchHistory,
        otherPlayersMatches: summoner.otherPlayersMatches,
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

// middleware to retrieve data for summoner search on TFT page
TFTController.updateTFTSummData = async (req, res, next) => {

  if (res.locals.TFTData) {
    return next();
  }

  try {
    const { summonerName } = req.params;

    const getSummData = await axios.get(`https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${summonerName}?api_key=${process.env.api_key}`,
    {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        "Origin": "https://developer.riotgames.com"
      }
    });

    const { data } = getSummData;
    const { puuid, profileIconId, summonerLevel, id } = data;

    const getRankData = await axios.get(`https://na1.api.riotgames.com/tft/league/v1/entries/by-summoner/${id}?api_key=${process.env.api_key}`,
    {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        "Origin": "https://developer.riotgames.com"
      }
    });

    const getRankData2 = await axios.get(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${process.env.api_key}`,
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
    const getMatchList = await axios.get(`https://americas.api.riotgames.com/tft/match/v1/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${process.env.api_key}`,
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
        const getMatchData = await axios.get(`https://americas.api.riotgames.com/tft/match/v1/matches/${matchIdList[i]}?api_key=${process.env.api_key}`,
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
      for (let j = 0; j < 8; j++) {

        if (matchData[i].participants[j].puuid === puuid) {
          const player = matchData[i].participants[j];
          TFTMatchHistory.push({
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

      TFTMatchHistory[i].traits = traitsMap;
      TFTMatchHistory[i].units = unitsMap;
      TFTMatchHistory[i].augments = augmentsMap;
      TFTMatchHistory[i].companion = littleLegendMap;

    };

    const TFTData = {
      TFTData: TFTMatchHistory,
      summonerName: summonerName,
      summonerIcon: profileIconId,
      summonerLevel: summonerLevel,
      summonerRank: rankData,
      otherPlayersMatches: otherPlayersData,
    }

    const summoner = await tftSummoner.findOne({summonerName: summonerName});

    if (summoner === null) {
      await tftSummoner.create({
        summonerName: summonerName,
        summonerLevel: summonerLevel,
        summonerRank: rankData,
        summonerIcon: profileIconId,
        TFTMatchHistory: TFTMatchHistory,
        otherPlayersMatches: otherPlayersData,
      });
    }

    else {
      await tftSummoner.findOneAndUpdate({summonerName: summonerName}, 
        {
          $set: {
            summonerIcon: profileIconId,
            summonerName: summonerName,
            summonerRank: rankData,
            summonerLevel: summonerLevel,
            TFTMatchHistory: TFTMatchHistory,
            otherPlayersMatches: otherPlayersData,
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

TFTController.getTFTDDBoxSummData = async (req, res, next) => {
  try {
    const { body } = req;

    // for (let i = 0; i < body.length; i++) {
    //   const playerNameRes = await axios.get(`https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-puuid/${body[i].puuid}?api_key=${process.env.api_key}`,
    //   {
    //     headers: {
    //       "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
    //       "Accept-Language": "en-US,en;q=0.9",
    //       "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
    //       "Origin": "https://developer.riotgames.com"
    //       }
    //   });
    //   body[i].name = playerNameRes.data.name;
    // }

    for (let i = 0; i < body.length; i++) {
      
      const augmentsMap = await mapAugmentIcons(body[i].augments);
      const littleLegendMap = await mapLittleLegendIcons(body[i].companion);
      const unitsMap = await mapUnitIcons(body[i].units);
      const traitsMap = await mapTraitIcons(body[i].traits);
      
      body[i].traits = traitsMap;
      body[i].units = unitsMap;
      body[i].companion = littleLegendMap;
      body[i].augments = augmentsMap;

    }

    res.locals.DDBoxData = body;
    return next();
  }
  catch(err) {
    console.log(err, 'err in getDDBoxSummData');
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