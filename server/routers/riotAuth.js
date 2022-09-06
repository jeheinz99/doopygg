const express = require('express');
const router = express.Router();

router.get('/auth/callback', (req, res) => {
  const accessCode = req.query.code;
  res.send(accessCode);
  console.log('hi inside callback');

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

module.exports = router;