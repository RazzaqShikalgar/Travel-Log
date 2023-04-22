const mongoose = require('mongoose');
const categorySchema =  new mongoose.Schema({
namee:{
    type:String,
    // required:'This field is required'
},
category: {
 type:String,
 enum: ['India','Paris','Malaysia','UnitedKingdom','Italy','France'],
},
// place:{

// },
image:{
    type:String,
    // required:'This field is required'
},
});

module.exports = mongoose.model('Category', categorySchema); 