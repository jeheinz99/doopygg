const leaderboardController = {};
const axios = require('axios');

// middleware to retrieve data for top 25 on NA leaderboards
leaderboardController.leaderboardData = async (req, res, next) => {

  const { regionName } = req.params;

  try {
    // async call to API to get summonerName, tier, wins/losses, leaguePoints about top 25 Challengers in N/A
    const leaderboardDataResponse = await axios.get(`https://${regionName}.api.riotgames.com/lol/league-exp/v4/entries/RANKED_SOLO_5x5/CHALLENGER/I?page=1&api_key=${process.env.api_key}`,
    {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        "Origin": "https://developer.riotgames.com"
      }
    });
    
    const { data } = leaderboardDataResponse;
    const data2 = data.splice(0, 25);
    
    // async call to API using summonerId from first call to get profile icon
    
    // for (let i = 0; i < 25; i++) {
      //   const { summonerId } = data[i];
        // const leaderboardDataResponseTwo = await axios.get(`https://${regionName}.api.riotgames.com/lol/summoner/v4/summoners/${summonerId}?api_key=${process.env.api_key}`,
        // {
        //     headers: {
        //           "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
        //           "Accept-Language": "en-US,en;q=0.9",
        //           "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        //           "Origin": "https://developer.riotgames.com"
        //       }
        //     });
          
        //     profileIconArr.push(leaderboardDataResponseTwo.data.profileIconId);
          
        //   }
          
    const profileIconArr = [];
    const leaderboardDataResponseTwo = await Promise.allSettled(data2.map(async player => {
      return await axios.get(`https://${regionName}.api.riotgames.com/lol/summoner/v4/summoners/${player.summonerId}?api_key=${process.env.api_key}`,
        {
          headers: {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
            "Accept-Language": "en-US,en;q=0.9",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://developer.riotgames.com"
          }
        }
      );
    }));

    for (let i = 0; i < leaderboardDataResponseTwo.length; i++) {
      profileIconArr.push(leaderboardDataResponseTwo[i].value.data.profileIconId);
    }

    const leaderboardDataArray = [];
    for (let i = 0; i < data2.length; i++) {
      const player = data2[i];
      leaderboardDataArray.push({
        summonerName: player.summonerName,
        summonerRank: player.tier,
        leaguePoints: player.leaguePoints,
        wins: player.wins,
        losses: player.losses,
        profileIcon: profileIconArr[i],
      });
    };

    const leaderboardData = {
      leaderboardData: leaderboardDataArray,
      profileIcon: profileIconArr,
    };
    res.locals.leaderboardData = leaderboardData;
    next();
  }
  catch(err) {
    console.log('error in summonerController at leaderboardData', err);
    next(err);
  };
};

module.exports = leaderboardController;