
const Blogs = require('../models/blogs');


exports.list = async(req, res) => {
    res.render('list');
}

 const blogs = async function insertdynamicdata(){
    try {
        await Blogs.insertMany([
                {
                    "name":"Japan",
                    "Date":"16 February 2023",
                    "image":"japan.jpg"
                },
                {
                    "name":"Maharashtra",
                    "Date":"19 February 2023",
                    "image":"maharaj.jpg"
                },
                {
                    "name":"gateway",
                    "Date":"16 March 2023",
                    "image":"malaysia.jpg"
                },
        ]);
    } catch (error) {
        console.log('error');
    }
}
// Blogs.save();

module.exports = blogs;



