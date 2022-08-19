const mongoose = require('mongoose');

// MongoDB Schema to store TFT Player data from Riot API
const tftSummonerSchema = new mongoose.Schema({
  summonerName: {type: String, required: true},
  summonerLevel: {type: String, required: false},
  summonerRank: {type: Object, required: false},
  region: {type: String, required: true},
  puuid: {type: String, required: false},
  summonerId: {type: String, required: false},
  accountId: {type: String, required: false},
  summonerIcon: {type: Number, required: false},
  TFTMatchHistory: {type: Array, required: false},
  otherPlayersMatches: {type: Array, required: false},
  Set7MatchesPlayed: {type: Array, required: false},
  Set7MatchesPlayedData: {type: Array, required: false},
  lastUpdated: {type: Number, required: false},
});

module.exports = mongoose.model('tftSummoner', tftSummonerSchema);