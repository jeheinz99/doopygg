const mongoose = require('mongoose');

const tftSummonerSchema = new mongoose.Schema({
  summonerName: {type: String, required: true},
  summonerLevel: {type: String, required: false},
  summonerRank: {type: Object, required: false},
  summonerIcon: {type: Number, required: false},
  TFTMatchHistory: {type: Array, required: false},
  otherPlayersMatches: {type: Array, required: false},
  S12MatchesPlayed: {type: Array, required: false},
  S12MatchesPlayedData: {type: Array, required: false},
});

module.exports = mongoose.model('tftSummoner', tftSummonerSchema);