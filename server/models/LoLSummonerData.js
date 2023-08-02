const mongoose = require('mongoose');

// MongoDB Schema to store Player Data
const lolSummonerSchema = new mongoose.Schema({
  summonerName: {type: String, required: true},
  summonerLevel: {type: String, required: false},
  summonerRank: {type: Object, required: false},
  region: {type: String, required: true},
  puuid: {type: String, required: false},
  summonerId: {type: String, required: false},
  accountId: {type: String, required: false},
  profileIcon: {type: Number, required: false},
  matchHistory: {type: Array, required: false},
  otherPlayersMatches: {type: Array, required: false},
  MatchesPlayed: {type: Array, required: false},
  MatchesPlayedData: {type: Array, required: false},
  lastUpdated: {type: Number, required: false},
});

module.exports = mongoose.model('lolSummoner', lolSummonerSchema);