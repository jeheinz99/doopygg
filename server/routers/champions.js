const express = require('express');
const championsController = require('../controllers/championsController');
const router = express.Router();

// CHAMPIONS ENDPOINT
// router handler to ahndle all requests to /champions endpoint

router.get('/:regionId/:queue/:tier/:division', championsController.getChampionData, (req, res) => {
  // console.log(res.locals.championData, 'res.locals.championData in server.js');
  return res.status(200).send(res.locals.championData);
});

module.exports = router;