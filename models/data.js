

const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    city_id:{type:Number},
    city_name:{type:String},
    country_name:{type:String},
    lat: {type:Number},
    lng:{type:Number},
    state_code:{type:String},

});

module.exports = mongoose.model('Data', DataSchema);
