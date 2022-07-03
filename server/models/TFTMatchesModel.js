const mongoose = require('mongoose');

// MongoDB Schema to store TFT Match data from Riot API
const tftMatchesSchema = new mongoose.Schema({
  matchId: {type: String, required: true},
  matchData: {type: Object, required: true},
});

module.exports = mongoose.model('tftMatches', tftMatchesSchema);