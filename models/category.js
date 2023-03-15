const mongoose = require('mongoose');
const categorySchema =  new mongoose.Schema({
namee:{
    type:String,
    // required:'This field is required'
},
image:{
    type:String,
    // required:'This field is required'
},
});

module.exports = mongoose.model('Category', categorySchema); 