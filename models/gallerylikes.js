const mongoose = require('mongoose');

const UserLikeSchema = new mongoose.Schema({
  user_id: {
    type:String,
    ref: 'User',
    required: true
  },
  gallery_id: {
    type:String,
    ref: 'Gallery',
    required: true
  }
});

module.exports = mongoose.model('UserLike', UserLikeSchema);