const mongoose = require('mongoose')

const blogsSchema = new mongoose.Schema({
    userid:String,
    blogTitle: String,
    blogCity: String,
    blogCountry: String,
    blogPlace: String,
    blogDescription: String,
    blogTransport:String,
    blogDate:String,
    blogBudget: String,
    blogCategory: String,
    image: String
});
const blogs = mongoose.model('blogs', blogsSchema)
module.exports = {blogs}