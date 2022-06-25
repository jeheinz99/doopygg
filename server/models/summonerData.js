const mongoose = require('mongoose');

const lolSummonerSchema = new mongoose.Schema({
  summonerName: {type: String, required: true},
  summonerLevel: {type: String, required: false},
  summonerRank: {type: Array, required: false},
  profileIcon: {type: Number, required: false},
  matchHistory: {type: Array, required: false},
  otherPlayersMatches: {type: Array, required: false},
  S12MatchesPlayed: {type: Array, required: false},
});

module.exports = mongoose.model('lolSummoner', lolSummonerSchema);