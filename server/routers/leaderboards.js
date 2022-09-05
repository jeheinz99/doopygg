const express = require('express');
const leaderboardController = require('../controllers/leaderboardController');
const router = express.Router();

// LEADERBOARD ENDPOINT
// router handler to handle all request to /leaderboard endpoint

router.get('/:regionName', leaderboardController.leaderboardData, (req, res) => {
  // console.log(res.locals.leaderboardData);
  return res.status(200).send(res.locals.leaderboardData);
});

module.exports = router;