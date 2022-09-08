const valorantController = {};
const axios = require('axios');
const authUsers = require('../models/AuthUsers');

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
      };
    }
    else {
      res.locals.valData = {};
    }
    return next();
  }
  catch(err) {
    console.log('error in valorantController at valData', err);
    next(err);
  };
};

module.exports = valorantController;