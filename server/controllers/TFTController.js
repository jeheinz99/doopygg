const TFTController = {};
const axios = require('axios');
const { api_key } = require('../data');
const db = require('../models/IconPaths');

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
    unitsArr.push(path.rows[0].path);
  }
  return unitsArr;
};

const mapTraitIcons = async traits => {

  const traitsArr = [];
  for (let i = 0; i < traits.length; i++) {
    const query = `SELECT path FROM traits WHERE name IN ('${traits[i].name}')`
    const path = await db.query(query);
    traitsArr.push(path.rows[0].path);
  }
  return traitsArr;
};

// middleware to retrieve data for summoner search on TFT page
TFTController.TFTData = async (req, res, next) => {
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
    const OtherPlayersData = [];
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
            unitIcons: [],
            traitIcons: [],
          });
        }
        else {
          const player = matchData[i].participants[j];
          OtherPlayersData.push({
            augments: player.augments,
          });
        }
      }
    }

    for (let i = 0; i < matchData.length; i++) {

      const augmentsMap = await mapAugmentIcons(TFTMatchHistory[i].augments);
      const littleLegendMap = await mapLittleLegendIcons(TFTMatchHistory[i].companion);
      const unitsMap = await mapUnitIcons(TFTMatchHistory[i].units);
      const traitsMap = await mapTraitIcons(TFTMatchHistory[i].traits);

      TFTMatchHistory[i].traitIcons = traitsMap;
      TFTMatchHistory[i].unitIcons = unitsMap;
      TFTMatchHistory[i].augments = augmentsMap;
      TFTMatchHistory[i].companion = littleLegendMap;

    };


    const TFTData = {
      TFTData: TFTMatchHistory,
      summonerName: summonerName,
      summonerIcon: profileIconId,
      OtherPlayersData: OtherPlayersData,
    }

    // console.log(TFTData);
    res.locals.TFTData = TFTData;
    next()
  } 
  catch(err) {
    console.log('error in TFTController at TFTData', err);
    next(err);
  };
};

module.exports = TFTController;