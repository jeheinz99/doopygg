const championsController = {};
const axios = require('axios');

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

championsController.getChampionData = async (req, res, next) => {
  try {
    const { regionId, queue, tier, division } = req.params;
    // console.log(regionId, queue, tier, division);
    const outputArr = [];
    for (let i = 0; i < 10000; i++) {
      const playersDataResponse = await axios.get(`https://${regionId}.api.riotgames.com/lol/league/v4/entries/${queue}/${tier}/${division}?page=${i}&api_key=${process.env.api_key}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
          "Accept-Language": "en-US,en;q=0.9",
          "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
          "Origin": "https://developer.riotgames.com"
        }
      });

      const { summonerId } = playersDataResponse.data;

      // const playerInfoResponse = await axios.get(``,
      // {
      //   headers: {
      //     "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
      //     "Accept-Language": "en-US,en;q=0.9",
      //     "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
      //     "Origin": "https://developer.riotgames.com"
      //   }
      // });

    }
    return next();
  }
  catch(err) {
    console.log(err, 'err in getChampionsData');
    return next(err);
  }
};

module.exports = championsController;