const mongoose = require('mongoose');
const gallerySchema =  new mongoose.Schema({
namee:{
    type:String,
    // required:'This field is required'
},
description:{
    type:String,
    // required:'This field is required'
},
image:{
    type:String,
    // required:'This field is required'
},
});

module.exports = mongoose.model('Gallery', gallerySchema); 