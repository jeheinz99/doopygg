const valorantController = {};
const axios = require('axios');
const authUsers = require('../models/AuthUsers');
const valMatches = require('../models/ValorantMatchesModel');


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

valorantController.checkValorantUser = async (req, res, next) => {
  const { regionId, riotId, tagLine } = req.params;
  try {
    const user = await authUsers.findOne({"gameName": { "$regex" : new RegExp(riotId, "i")}, "tagLine": tagLine, "region": regionId});
    if (user !== null) {
      res.locals.valData = {
        gameName: user.gameName,
        tagLine: user.tagLine,
        puuid: user.puuid,
        search: true,
      };
    }
    else {
      res.locals.valData = {
        gameName: riotId,
        tagLine: tagLine,
        search: false,
      };
      return res.send(res.locals.valData);
    }
    return next();
  }
  catch(err) {
    console.log('error in valorantController at checkValorantUser', err);
    next(err);
  };
};

valorantController.getValorantUserData = async(req, res, next) => {
  const { puuid } = res.locals.valData;
  if (!res.locals.valData) {
    return next();
  }
  try {
    // gets array of objects containing the match id, game start time, and queue name of the past 32? games
    const valorantUserDataRes = await axios.get(`https://na.api.riotgames.com/val/match/v1/matchlists/by-puuid/${puuid}?api_key=${process.env.val_api_key}`);
    const { history } = valorantUserDataRes.data;
    const matchIdList = [];
    for (let i = 0; i < 5; i++) {
      matchIdList.push(history[i].matchId);
    }

    const matchHistoryData = [];
    const neededObjs = [];

    // check DB for each ID in player's recent matches
    const matchObjs = await valMatches.find({ matchId: { $in: matchIdList }});

    // create new set of match obj ids of ids found in DB
    const set = new Set();
    for (let i = 0; i < matchObjs.length; i++) {
      set.add(matchObjs[i].matchId);
      matchHistoryData.push(matchObjs[i].matchData);
    }

    // if the set doesn't have the id, we don't have in DB so push to needed arr
    for (let i = 0; i < matchIdList.length; i++) {
      if (!set.has(matchIdList[i])) neededObjs.push(matchIdList[i]);
    }

    if (neededObjs.length > 0) {
      const gettingMatchObjs = await Promise.allSettled(neededObjs.map(async id => {
        return await axios.get(`https://na.api.riotgames.com/val/match/v1/matches/${id}?api_key=${process.env.val_api_key}`,
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

      for (let i = 0; i < gettingMatchObjs.length; i++) {
        matchHistoryData.push(gettingMatchObjs[i].value.data);
      }

      await Promise.allSettled(gettingMatchObjs.map(async obj => {
        if (obj.status !== 'rejected') {
          await valMatches.create({
            matchId: obj.value.data.matchInfo.matchId,
            matchData: obj.value.data
          });
        }
      }));
    }
    const sortedMatchHistory = matchHistoryData.sort((a, b) => b.matchInfo.gameStartMillis - a.matchInfo.gameStartMillis);

    res.locals.valData.matchHistory = matchHistoryData;
    return next();
  }
  catch(err) {
    console.log('error in valorantController at getValorantUserData', err);
    next(err);
  }
};

module.exports = valorantController;