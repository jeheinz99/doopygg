const mongoose = require('mongoose');

// MongoDB Schema to store valorant match data from Riot API
const valMatchesSchema = new mongoose.Schema({
  matchId: {type: String, required: true},
  matchData: {type: Object, required: true},
});

module.exports = mongoose.model('valMatches', valMatchesSchema);