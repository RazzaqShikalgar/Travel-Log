var {blogs} = require('../models/blogsModel');
var ObjectId = require('mongoose').Types.ObjectId;
const cloudinary = require("cloudinary").v2; 

cloudinary.config({
    cloud_name: "dsswjmlin",
    api_key: "164156195648782",
    api_secret: "jzH8Kn65JibCVdvmBBcMJ8yZ55U",
  });

exports.insert = async (req,res) =>{
//     const file = req.files.image;
//   cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
//     console.log(result.url);
//       const image = result.url;
    //   const image = req.file.filename;
      console.log(req.body)
      let newblogs = new blogs(JSON.parse(JSON.stringify(req.body)));
      newblogs.save();
    // });
    // const file = req.files?.image;
    // cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
    //     console.log(result.url);
    //     console.log(req.body)
    //     let newBlogs = new Blogs(JSON.parse(JSON.stringify(req.body)));
    //     newBlogs.save();
    // })
}

exports.index = async (req,res) => {
    console.log(req.query)
    try{
        const data = await blogs.find({});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}
