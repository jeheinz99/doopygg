const express = require('express');
const router = express.Router();
const request = require('request');
const authController = require('../controllers/authController');

// AUTH ENDPOINT
// router handler to handle all requests to authentication

router.get('/auth/callback', authController.getAuthTokens, authController.setTokenCookies, (req, res) => {
  return res.status(300).redirect('https://www.doopy.dev/valorant');
});

router.get('/auth', authController.getAuthLink, (req, res) => {
  return res.status(200).send(res.locals.authLink)
});

module.exports = router;