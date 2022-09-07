const authController = {};
// const axios = require('axios');

const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const appBaseUrl = 'http://www.doopy.dev';
const appCallbackUrl = `${appBaseUrl}/riot/auth/callback`;

const provider = 'https://auth.riotgames.com'
const authorizeUrl = `${provider}/authorize`;
const tokenUrl = `${provider}/token`;

const redirect_uri = 'http://www.doopy.dev/riot/auth';

authController.getAuthTokens = (req, res, next) => {
  const accessCode = req.query.code;
  // make server-to-server request to token endpoint
  // exchange auth code for tokens
  request.post({
    url: tokenUrl,
    auth: { 
      // sets "Authorization: Basic ..." header
      user: clientID,
      pass: clientSecret
    },
    form: { 
      // post information as form-data
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

      // store tokens in res.locals
      res.locals.tokens = tokens;
      return next();
    } else {
      res.send('failed token request');
    }
  });
};

authController.setTokenCookies = (req, res, next) => {
  const { tokens } = res.locals;
  res.cookie('accessToken', `${tokens.access_token}`);
  res.cookie('refreshToken', `${tokens.refresh_token}`)
  return next();
};

authController.getAuthLink = (req, res, next) => {
  const link = `${authorizeUrl}?redirect_uri=${appCallbackUrl}&client_id=${clientID}&response_type=code&scope=openid`;
  res.locals.authLink = ('<a href="' + link + '"> Sign In</a>');
  return next();
};

module.exports = authController;