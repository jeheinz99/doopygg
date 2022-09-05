const express = require('express');
const TFTController = require('../controllers/TFTController');
const router = express.Router();

// TFT ENDPOINT 
// router handler to handle all request to /tft endpoint

router.get('/:regionId/:summonerName', TFTController.checkTFTSummData, TFTController.updateTFTSummData, TFTController.addTFTSummMatchesData, (req, res) => {
  // console.log(res.locals.TFTData);
  return res.status(200).send(res.locals.TFTData);
});

router.post('/ddboxdata', TFTController.getTFTDDBoxSummData, (req, res) => {
  return res.status(200).send(res.locals.DDBoxData);
});

router.get('/update/:regionId/:summonerName', TFTController.updateTFTSummData, TFTController.addTFTSummMatchesData, (req, res) => {
  // console.log(res.locals.TFTData);
  return res.status(200).send(res.locals.TFTData);
});

module.exports = router;