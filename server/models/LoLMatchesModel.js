const mongoose = require('mongoose');

// MongoDB Schema to store match data from Riot API
const lolMatchesSchema = new mongoose.Schema({
  matchId: {type: String, required: true},
  matchData: {type: Object, required: true},
});

module.exports = mongoose.model('lolMatches', lolMatchesSchema);