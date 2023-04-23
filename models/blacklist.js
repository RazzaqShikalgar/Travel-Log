const mongoose = require('mongoose');

const blacklistSchema = new mongoose.Schema({
  token: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24 * 7, // expire in 7 days
  },
});

const Blacklist = mongoose.model('Blacklist', blacklistSchema);

module.exports = Blacklist;