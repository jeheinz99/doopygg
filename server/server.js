const path = require('path');
const express = require('express');

const app = express();
const PORT = 3000;

// parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// router handler to respond with main app
const summonerRouter = express.Router();
summonerRouter.use('/', summonerRouter);
// console.log('hiiiiiii');

// handles requests for static files
app.use('/', express.static(path.join(__dirname, '../client')));

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
// app.listen(PORT, () => {
//   console.log(`Server listening on port: ${PORT}`);
// });

module.exports = app;