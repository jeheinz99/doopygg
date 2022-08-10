const mongoose = require('mongoose');

// MongoDB Schema to store Player Data
const lolSummonerSchema = new mongoose.Schema({
  summonerName: {type: String, required: true},
  summonerLevel: {type: String, required: false},
  summonerRank: {type: Object, required: false},
  puuid: {type: String, required: false},
  profileIcon: {type: Number, required: false},
  matchHistory: {type: Array, required: false},
  otherPlayersMatches: {type: Array, required: false},
  S12MatchesPlayed: {type: Array, required: false},
  S12MatchesPlayedData: {type: Array, required: false},
  lastUpdated: {type: Number, required: false},
});

module.exports = mongoose.model('lolSummoner', lolSummonerSchema);