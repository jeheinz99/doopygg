const express = require('express');
const summonerController = require('../controllers/summonerController');
const router = express.Router();

// SUMMONER ENDPOINT
// router handler to handle all requests to main app endpoint with summoners

router.get('/:regionId/:summonerName', summonerController.checkSummData, summonerController.updateSummData, summonerController.addSummMatchesData, (req, res) => {
  // console.log(res.locals.summonerData, 'summoner data in backend');
  return res.status(200).send(res.locals.summonerData);
});

router.post('/ddboxdata', summonerController.getDDBoxSummData, (req, res) => {
  return res.status(200).send(res.locals.DDBoxData);
});

router.get('/history/:regionId/:summonerName/:historyLength', summonerController.expandSummMatchHistory, (req, res) => {
  return res.status(200).send(res.locals.newSummMatchHistory);
});

router.get('/update/:regionId/:summonerName', summonerController.updateSummData, summonerController.addSummMatchesData, (req, res) => {
  // console.log(res.locals.recentSummoner, ' recent summoner in server js');
  return res.status(200).send(res.locals.summonerData);
});

router.get('/livegamedata/:regionId/:summonerName', summonerController.getLiveGameData, (req, res) => {
  // console.log(res.locals.liveGameData, 'live game data in server js');
  return res.status(200).send(res.locals.liveGameData);
});

router.get('/test', (req, res) => {
  return res.status(200).send(res.locals.summonerTestData);
});

module.exports = router;