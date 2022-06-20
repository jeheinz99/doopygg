const mongoose = require('mongoose');

const lolMatchesSchema = new mongoose.Schema({
  matchId: {type: String, required: true},
  matchData: {type: Object, required: true},
});

module.exports = mongoose.model('lolMatches', lolMatchesSchema);