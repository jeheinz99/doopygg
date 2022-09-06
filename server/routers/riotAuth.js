const express = require('express');
const router = express.Router();
const request = require('request');

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
  (err, response, body) => {
    if (!err && response.statusCode === 200) {
      // parse the response to JSON
      const payload = JSON.parse(body);
      // separate the tokens from the entire response body
      const tokens = {
        refresh_token: payload.refresh_token,
        id_token: payload.id_token,
        access_token: payload.access_token
      };

      // Legibly print out our tokens
      res.send("<pre>" + JSON.stringify(tokens, false, 4) + "</pre");
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