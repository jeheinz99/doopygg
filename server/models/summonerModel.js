const mongoose = require('mongoose');

const summonerSchema = new mongoose.Schema({
  summonerName: {type: String, required: true},
});

module.exports = mongoose.model('summoner', summonerSchema);