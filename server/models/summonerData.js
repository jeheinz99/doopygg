const mongoose = require('mongoose');

const summonerSchema = new mongoose.Schema({
  summonerName: {type: String, required: true},
  puuid: {type: String, required: false},
  matchesPlayed: {type: Array, required: false},
  matchesData: {type: Array, required: false},
  summonerRecentData: {type: Object, required: false},
});

module.exports = mongoose.model('Summoner', summonerSchema);