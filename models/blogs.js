const mongoose = require('mongoose');
const blogSchema =  new mongoose.Schema({
    blogTitle:{
    type:String,
    required:'This field is required'
},
blogDate:{
    type:String,
    required:'This field is required'
},
image:{
    type:String,
    required:'This field is required'
}
});

module.exports = mongoose.model('Blogs', blogSchema); 