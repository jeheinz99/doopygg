const mongoose = require('mongoose');

// MongoDB Schema to store auth token user ids that have authenticated
const authUsersSchema = new mongoose.Schema({
  userId: {type: String, required: true},
});

module.exports = mongoose.model('authUsers', authUsersSchema);