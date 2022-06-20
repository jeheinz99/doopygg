const TFTController = {};
const axios = require('axios');
const { api_key } = require('../data');
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
  // console.log(path.rows, 'path rows after query');
  return [path.rows[0].path, path.rows[1].path, path.rows[2].path];
};

const mapLittleLegendIcons = async legendId => {
  const query = `SELECT path FROM littlelegends WHERE id IN ('${legendId}')`;

  const path = await db.query(query);
  return path.rows[0].path;
};

const mapUnitIcons = async units => {

  const unitsArr = [];
  for (let i = 0; i < units.length; i++) {
    const query = `SELECT path FROM tftchamps WHERE name IN ('${units[i].character_id}')`
    const path = await db.query(query);
    units[i]["unitIcon"] = path.rows[0].path;
  }
  return units;
};

const mapTraitIcons = async traits => {

  for (let i = 0; i < traits.length; i++) {
    const query = `SELECT path FROM traits WHERE name IN ('${traits[i].name}')`
    const path = await db.query(query);
    traits[i]["traitIcon"] = path.rows[0].path;
  }
  return traits;
};

TFTController.checkTFTSummData = async (req, res, next) => {

  const { summonerName } = req.params;
  
  try {
    const summoner = await tftSummoner.findOne({summonerName: summonerName});

    if (summoner !== null) {
      res.locals.TFTData = summoner.summonerRecentData;
      return next();
    }
    return next();
  }
  catch(err) {
    console.log('error in checkTFTSummData');
    return next(err);
  }
}

// middleware to retrieve data for summoner search on TFT page
TFTController.updateTFTSummData = async (req, res, next) => {

  if (res.locals.TFTData) {
    return next();
  }

  try {
    const { summonerName } = req.params;
    // console.log('TFTData back-end', summonerName);

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
    const getMatchList = await axios.get(`https://americas.api.riotgames.com/tft/match/v1/matches/by-puuid/${puuid}/ids?start=0&count=3&api_key=${api_key}`,
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
      // pings DB to findOne match based on the matchId
      const match = await tftMatches.findOne({matchId: matchIdList[i]});
      // if match returns null (doesn't exist in DB), ping API and then store it
      if (match === null) {
        const getMatchData = await axios.get(`https://americas.api.riotgames.com/tft/match/v1/matches/${matchIdList[i]}?api_key=${api_key}`,
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

    for (let i = 0; i < otherPlayersData.length; i++) {
      
      const augmentsMap = await mapAugmentIcons(otherPlayersData[i].augments);
      const littleLegendMap = await mapLittleLegendIcons(otherPlayersData[i].companion);
      const unitsMap = await mapUnitIcons(otherPlayersData[i].units);
      const traitsMap = await mapTraitIcons(otherPlayersData[i].traits);

      otherPlayersData[i].traits = traitsMap;
      otherPlayersData[i].units = unitsMap;
      otherPlayersData[i].companion = littleLegendMap;
      otherPlayersData[i].augments = augmentsMap;

    }


    const TFTData = {
      TFTData: TFTMatchHistory,
      summonerName: summonerName,
      summonerIcon: profileIconId,
      otherPlayersData: otherPlayersData,
    }

    const summoner = await tftSummoner.findOne({summonerName: summonerName});

    if (summoner === null) {
      await tftSummoner.create({
        summonerName: summonerName,
        puuid: puuid,
        summonerRecentData: TFTData,
      });
    }
    else {
      await tftSummoner.findOneAndUpdate({summonerName: summonerName}, {summonerRecentData: TFTData});
    }

    res.locals.TFTData = TFTData;
    return next();
  } 
  catch(err) {
    console.log('error in TFTController at TFTData', err);
    return next(err);
  };
};

module.exports = TFTController;