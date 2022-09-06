const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const authRouter = require('./routers/auth');
const riotAuthRouter = require('./routers/riotAuth');
const summonerRouter = require('./routers/summoner');
const TFTRouter = require('./routers/tft');
const valorantRouter = require('./routers/valorant');
const leaderboardRouter = require('./routers/leaderboards');
const championsRouter = require('./routers/champions');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'DoopyGG-Cluster'
})
.then(() => console.log('Connected to Mongo DB.'))
.catch(err => console.log(err));

// parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// // handles requests for static files
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "../dist")));
}

// allows requests with headers to back-end from our localhost endpoint
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://www.doopy.dev/');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://www.doopy.dev/');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.use('/auth', authRouter);
app.use('/riot', riotAuthRouter);
app.use('/summoner', summonerRouter);
app.use('/tft', TFTRouter);
app.use('/leaderboards', leaderboardRouter);
app.use('/valorant', valorantRouter);
app.use('/champions', championsRouter);

// catch-all route handler for any requests to an unknown route 
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});
// app.use((req, res) => res.status(404).send('This is not the page you\'re looking for...'));

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