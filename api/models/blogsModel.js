const mongoose = require('mongoose')

const blogsSchema = new mongoose.Schema({
    placename: String,
    cityname: String,
    countryname: String,
    category: String,
    file:String,
    budget: String,
    todo:String,
    transport:String,
    description:String,
    blogTitle:String,
    
})
// blogsSchema.methods.insert = function insert() {

// }

const blogs = mongoose.model('blogs', blogsSchema)

module.exports = {blogs}