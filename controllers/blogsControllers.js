const fs = require('fs');
const {blogs} = require('../models/blogsModel');
const cloudinary = require("cloudinary").v2; 
// const path = require("path");
exports.insert = async (req, res) => {
  try {
    let data = JSON.parse(JSON.stringify(req.body));
    // console.log(req.file);
    const result = await cloudinary.uploader.upload(req.file.path);
    data.image = result.secure_url;
    console.log(result.secure_url,"This is the link bruhh");
    let newblogs = new blogs(data);
    await newblogs.save();
    console.log(newblogs);
    res.send("Blog added successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error adding blog");
  }
};
exports.index = async (req,res) => {
    console.log(req.query)
    try{
        const data = await blogs.find(req.query || {});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

