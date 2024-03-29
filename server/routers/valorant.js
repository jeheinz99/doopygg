const express = require('express');
const valorantController = require('../controllers/valorantController');
const router = express.Router();

// VALORANT ENDPOINT
// router handler to handle all request to /valorant endpoint 

router.get('/playerdata/:regionId/:riotId/:tagLine', valorantController.checkValorantUser, valorantController.getValorantUserData, (req, res) => {
  // console.log(res.locals.valData);
  return res.status(200).send(res.locals.valData);
});

// router.get('/signout', (req, res) => {
//   return res.status(200).send('logged out');
// });

module.exports = router;