const fs = require('fs');
const {blogs} = require('../models/blogsModel');
const cloudinary = require("cloudinary").v2;
const User = require("../models/signup.js");
const {check} = require("../routes/routes.js")
// console.log(check);
// const path = require("path");
exports.insert = async(req, res, next) => {
  try {
    // Apply the check middleware function to this route
    check(req, res, async function(err) {
      if (err) {
        res.status(400).send(err.message);
      } else {
        let data = JSON.parse(JSON.stringify(req.body));
        const result = await cloudinary.uploader.upload(req.file.path);
        const userid = req.data._id;
        console.log(userid,"This is user id");
        data.image = result.secure_url;
        data.userid = userid;
        console.log(result.secure_url,"This is the link bruhh");
        let newblogs = new blogs(data);
        await newblogs.save();
        console.log(newblogs);
        res.send("Blog added successfully");
      }
    });
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

