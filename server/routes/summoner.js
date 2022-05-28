const express = require('express');

const summonerController = require('../controllers/summonerController');

// add request to get summoner data
router.get('/', summonerController.summData, async (req, res) => {
  console.log('hiiiiiii')
  return res.status(200).send(res.locals.summonerData);
});

// router.post('/', summonerController.summData, (req, res) => {
//   console.log('hi')
//   res.send(res.locals.summData);
// })

// router.post('/', (req, res) => {
//   return res.status(200)
// });

module.exports = router;