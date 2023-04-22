const mongoose = require('mongoose');
const blogSchema =  new mongoose.Schema({
name:{
    type:String,
    required:'This field is required'
},
Date:{
    type:String,
    required:'This field is required'
},
image:{
    type:String,
    required:'This field is required'
}
});

module.exports = mongoose.model('Blogs', blogSchema); 