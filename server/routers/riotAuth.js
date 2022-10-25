const express = require('express');
const router = express.Router();
const request = require('request');
const axios = require('axios');
const authUsers = require('../models/AuthUsers');

// AUTH ENDPOINT
// router handler to handle all requests to authentication
const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const appBaseUrl = 'http://www.doopy.dev';
const appCallbackUrl = `${appBaseUrl}/riot/auth/callback`;

const provider = 'https://auth.riotgames.com'
const authorizeUrl = `${provider}/authorize`;
const tokenUrl = `${provider}/token`;

const redirect_uri = 'http://www.doopy.dev/riot/auth';

router.get('/auth/callback', (req, res) => {
  const accessCode = req.query.code;
  // make server-to-server request to token endpoint
  // exchange auth code for tokens
  request.post({
    url: tokenUrl,
    auth: { // sets "Authorization: Basic ..." header
      user: clientID,
      pass: clientSecret
    },
    form: { // post information as form-data
      grant_type: "authorization_code",
      code: accessCode,
      redirect_uri: appCallbackUrl
    }
  }, 
  async (err, response, body) => {
    if (!err && response.statusCode === 200) {
      // parse the response to JSON
      const payload = JSON.parse(body);
      // separate the tokens from the entire response body
      const tokens = {
        refresh_token: payload.refresh_token,
        id_token: payload.id_token,
        access_token: payload.access_token
      };

      const getUserData = await axios.get('https://americas.api.riotgames.com/riot/account/v1/accounts/me', 
      {
        headers: {
          Authorization: `Bearer ${payload.access_token}`
        }
      });
      const { puuid, gameName, tagLine } = getUserData.data;

      const user = await authUsers.findOne({"gameName": { "$regex" : new RegExp(gameName, "i")}, "tagLine": tagLine, "puuid": puuid});
      if (user === null) {
        await authUsers.create({
          puuid: puuid,
          gameName: gameName,
          tagLine: tagLine,
          region: 'na1',
          access_token: payload.access_token,
          refresh_token: payload.refresh_token,
          id_token: payload.id_token,
        });
      }
      else {
        await authUsers.findOneAndUpdate({"gameName": { "$regex" : new RegExp(gameName, "i")}, "tagLine": tagLine, "puuid": puuid}, 
        {
          puuid: puuid,
          gameName: gameName,
          tagLine: tagLine,
          access_token: payload.access_token,
          refresh_token: payload.refresh_token,
          id_token: payload.id_token,
        });
      }

      res.cookie('accessToken', payload.access_token);
      res.cookie('refreshToken', payload.refresh_token);
      res.cookie('currGameName', gameName);
      res.cookie('currTagLine', tagLine);

      // res.send("<pre>" + JSON.stringify(tokens, false, 4) + "</pre");
      return res.status(300).redirect('/valorant');
    } else {
      res.send("/token request failed");
    }
  });
});

router.get('/auth', (req, res)=> { 
  const link = `${authorizeUrl}?redirect_uri=${appCallbackUrl}&client_id=${clientID}&response_type=code&scope=openid`;
  res.send('<a href="' + link + '"> Sign In</a>');
});

module.exports = router;