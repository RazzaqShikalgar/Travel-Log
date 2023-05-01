const mongoose = require('mongoose');

const gallerylikeSchema = new mongoose.Schema({
  galleryId: {
    type: String,
    required: true
  },
  Image:{
    type:String,
  },
  Title:{
type:String,
  },
postedby:{
type:String,
  },
  description:{
  type:String,
  },
});

const UserLikeSchema = new mongoose.Schema({

  userid :{
   type:String,
  },
  items: {
    type: [gallerylikeSchema],
    default: []
  },
  Total: {
    type: Number,
    default: 0
  },
  username:{type:String},
}, {
  timestamps: true
});
module.exports = mongoose.model('UserLike', UserLikeSchema);