const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;
const { MONGO_URI } = require('./data');
const mongoose = require('mongoose');

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'DoopyGG-Cluster'
})
.then(() => console.log('Connected to Mongo DB.'))
.catch(err => console.log(err));

// require summoner controllers
const summonerController = require('./controllers/summonerController');

// require valorant controllers
const valorantController = require('./controllers/valorantController');

// require tft controllers
const TFTController = require('./controllers/TFTController');

// require leaderboard controllers
const leaderboardController = require('./controllers/leaderboardController');

// parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// // handles requests for static files
// app.use('/', express.static(path.join(__dirname, ' ../client')));


// allows requests with headers to back-end from our localhost endpoint
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

// TFT ENDPOINT 
// router handler to handle all request to /tft endpoint
const TFTRouter = express.Router();
app.use('/tft', TFTRouter);

TFTRouter.get('/update/:summonerName', TFTController.updateTFTSummData, (req, res) => {
  // console.log(res.locals.TFTData);
  return res.status(200).send(res.locals.TFTData);
});

// summonerController.checkSummData, summonerController.updateSummData
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

// SUMMONER ENDPOINT
// router handler to handle all requests to main app endpoint with summoners
const summonerRouter = express.Router();
app.use('/summoner', summonerRouter);

summonerRouter.get('/update/:summonerName',  summonerController.updateSummData, (req, res) => {
  // console.log(res.locals.recentSummoner, ' recent summoner in server js');
  return res.status(200).send(res.locals.summonerData);
});

summonerRouter.get('/:summonerName', summonerController.checkSummData, summonerController.updateSummData, (req, res) => {
  // console.log(res.locals.summonerData);
  return res.status(200).send(res.locals.summonerData);
});

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.status(404).send('This is not the page you\'re looking for...'));

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
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;