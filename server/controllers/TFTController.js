const TFTController = {};
const axios = require('axios');

// need new api key every day
const api_key = 'RGAPI-dfb26bd0-9f47-4fed-875c-46eab36aa0be';

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
    for (let i = 0; i < matchData.length; i++) {
      for (let j = 0; j < 8; j++) {
        if (matchData[i].participants[j].puuid === puuid) {
          const player = matchData[i].participants[j];
          TFTMatchHistory.push({
            matchLength: matchData[i].game_length,
            setNumber: matchData[i].tft_set_number,
            augments: player.augments,
            companion: player.companion,
            level: player.level,
            placement: player.placement,
            damageDealt: player.total_damage_to_players,
            traits: player.traits,
            units: player.units,
          });
        }
      }
    };
    const TFTData = {
      TFTData: TFTMatchHistory,
      summonerName: summonerName,
      summonerIcon: profileIconId,
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