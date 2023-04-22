const mongoose = require('mongoose');
const placeSchema =  new mongoose.Schema({
name:{
    type:String,
    // required:'This field is required'
},
category: {
 type:String,
 enum: ['Varanasi','Lonavla','Jaisalmer','Rajasthan','Mozambique','Taiwan'],
},
image:{
    type:String,
    // required:'This field is required'
},
});

module.exports = mongoose.model('Place', placeSchema); 