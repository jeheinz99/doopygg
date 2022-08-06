const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'DoopyGG-Cluster'
})
.then(() => console.log('Connected to Mongo DB.'))
.catch(err => console.log(err));

const summonerController = require('./controllers/summonerController');
const valorantController = require('./controllers/valorantController');
const TFTController = require('./controllers/TFTController');
const leaderboardController = require('./controllers/leaderboardController');

// parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// // handles requests for static files
// app.use(express.static(path.join(__dirname, "../dist")));

// allows requests with headers to back-end from our localhost endpoint
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://doopygg-sigma.vercel.app/');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://doopygg-sigma.vercel.app/');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

// SUMMONER ENDPOINT
// router handler to handle all requests to main app endpoint with summoners
const summonerRouter = express.Router();
app.use('/summoner', summonerRouter);

summonerRouter.get('/:summonerName', summonerController.checkSummData, summonerController.updateSummData, summonerController.addSummMatchesData, (req, res) => {
  // console.log(res.locals.summonerData);
  return res.status(200).send(res.locals.summonerData);
});

summonerRouter.post('/ddboxdata', summonerController.getDDBoxSummData, (req, res) => {
  return res.status(200).send(res.locals.DDBoxData);
});

summonerRouter.get('/update/:summonerName', summonerController.updateSummData, summonerController.addSummMatchesData, (req, res) => {
  // console.log(res.locals.recentSummoner, ' recent summoner in server js');
  return res.status(200).send(res.locals.summonerData);
});

summonerRouter.get('/livegamedata/:summonerName', summonerController.getLiveGameData, (req, res) => {
  console.log(res.locals.liveGameData, 'live game data in server js');
  return res.status(200).send(res.locals.liveGameData);
});

summonerRouter.get('/test', summonerController.testSummData, (req, res) => {
  return res.status(200).send(res.locals.summonerTestData);
});

// TFT ENDPOINT 
// router handler to handle all request to /tft endpoint
const TFTRouter = express.Router();
app.use('/tft', TFTRouter);

TFTRouter.post('/ddboxdata', TFTController.getTFTDDBoxSummData, (req, res) => {
  return res.status(200).send(res.locals.DDBoxData);
});

TFTRouter.get('/update/:summonerName', TFTController.updateTFTSummData, (req, res) => {
  // console.log(res.locals.TFTData);
  return res.status(200).send(res.locals.TFTData);
});

TFTRouter.get('/:summonerName', TFTController.checkTFTSummData, TFTController.updateTFTSummData, (req, res) => {
  // console.log(res.locals.TFTData);
  return res.status(200).send(res.locals.TFTData);
});

// LEADERBOARD ENDPOINT
// router handler to handle all request to /leaderboard endpoint
const leaderboardRouter = express.Router();
app.use('/leaderboards', leaderboardRouter);

leaderboardRouter.get('/:regionName', leaderboardController.leaderboardData, (req, res) => {
  // console.log(res.locals.leaderboardData);
  return res.status(200).send(res.locals.leaderboardData);
});

// VALORANT ENDPOINT
// router handler to handle all request to /valorant endpoint 
const valorantRouter = express.Router();
app.use('/valorant', valorantRouter);

valorantRouter.get('/:riotId/:tagLine', valorantController.valData, (req, res) => {
  // console.log(res.locals.valData);
  return res.status(200).send(res.locals.valData);
});
// catch-all route handler for any requests to an unknown route
// app.use((req, res) => res.status(404).send('This is not the page you\'re looking for...'));
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "../dist")));
}

// global error handler - only invoked when next passes in an arg
app.use((err, req, res, next) => {
  const defaultErr = {
    log: `Express error handler caught unknown middleware error: ${err}`,
    status: 400,
    message: { err: `An error occurred` }
  };
  console.log(defaultErr, err);
  const errorObj = Object.assign(defaultErr, err);
  console.log(JSON.stringify(errorObj.log));
  return res.status(errorObj.status).send(JSON.stringify(errorObj.message));
});

// starts server
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port: ${process.env.PORT}`);
});

module.exports = app;