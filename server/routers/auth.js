const express = require('express');
const router = express.Router();

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


router.get('/', (req, res) => {
  const link = `${authorizeUrl}?redirect_uri=${appCallbackUrl}&client_id=${clientID}&response_type=code&scope=openid`;
  res.send('<a href="' + link + '"> Sign In</a>');
});

module.exports = router;