const mongoose = require('mongoose');

// MongoDB Schema to store auth token user ids that have authenticated
const authUsersSchema = new mongoose.Schema({
  puuid: {type: String, required: true},
  gameName: {type: String, required: true},
  tagLine: {type: String, required: true},
  region: {type: String, required: true},
  access_token: {type: String, required: true},
  refresh_token: {type: String, required: true},
  id_token: {type: String, required: true},
});

module.exports = mongoose.model('authUsers', authUsersSchema);