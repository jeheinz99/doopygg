const mongoose = require('mongoose');

const tftMatchesSchema = new mongoose.Schema({
  matchId: {type: String, required: true},
  matchData: {type: Object, required: true},
});

module.exports = mongoose.model('tftMatches', tftMatchesSchema);