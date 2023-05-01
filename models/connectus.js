const mongoose = require('mongoose');
const connectschema =  new mongoose.Schema({
email:{
    type:String,
    // required:'This field is required'
},
doyoutravel: {
 type:String,
},
whyconnect:{
    type:String,
    // required:'This field is required'
},
});

module.exports = mongoose.model('Connect', connectschema); 