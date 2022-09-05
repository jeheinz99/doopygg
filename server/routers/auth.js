const express = require('express');
// const authController = require('../controllers/authController');
const router = express.Router();

// AUTH ENDPOINT
// router handler to handle all requests to authentication

router.get('/callback', (req, res) => {
  res.send('temp');
});
// app.use('/riot/auth', authRouter);

module.exports = router;