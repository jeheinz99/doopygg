const mongoose = require('mongoose');

const tftSummonerSchema = new mongoose.Schema({
  summonerName: {type: String, required: true},
  puuid: {type: String, required: true},
  summonerRecentData: {type: Object, required: true},
  matchesPlayed: {type: Array, required: false},
});

module.exports = mongoose.model('tftSummoner', tftSummonerSchema);