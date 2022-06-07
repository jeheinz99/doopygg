const valorantController = {};
const axios = require('axios');
const { api_key } = require('../data');

valorantController.valData = async (req, res, next) => {

  const { riotId, tagLine } = req.params;
  // console.log('riotId and tagLine in controller', riotId, tagLine);

  try {
    const valDataResponse = await axios.get(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${riotId}/${tagLine}?api_key=${api_key}`,
    {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        "Origin": "https://developer.riotgames.com"
      }
    });
    res.locals.valData = valDataResponse;
    next();
  }
  catch(err) {
    console.log('error in valorantController at valData', err);
    next(err);
  };
};

module.exports = valorantController;