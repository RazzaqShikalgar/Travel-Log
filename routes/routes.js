const express = require('express');
const app = express();
const route = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passport = require("passport");
// const cards = require('../controllers/cardscontroller.js');
// const saltRound=10;
// const encrypt = require("mongoose-encryption");
//Models and Controller Exports --------------------------------
const a = require('../controllers/photocontroller.js');
const blogs = require('../controllers/blogcontroller.js');
const gallery = require('../controllers/gallerycontroller.js');
const cards = require('../controllers/cardscontroller.js');
const Category = require('../models/category');
const Blogs = require('../models/blogs');
// const User = require('../models/signup');
const Cards = require('../models/cards');
const Gallery = require('../models/gallery');
//models

const User = require("../models/signup.js");

route.get('/',async(req,res) => {
  // const name="here";
  const categories = await Category.find({}).limit(8);
  const blogs = await Blogs.find({}).limit(3);
  const cards = await Cards.find({}).limit(4);
  const gallery = await Gallery.find({}).limit(20);
  res.render("list",{message:'',names:'',categories,blogs,cards,gallery});
  // console.log(categories);

//   try {
//   const limitNumber = 8;
//   const blognumber = 3;
//   const cardNumber = 4;
//   const galleryNumber =20;
//   // const User = 1;
//   const categories = await Category.find({}).limit(limitNumber);
//   const blogs = await Blogs.find({}).limit(blognumber);
//   const cards = await Cards.find({}).limit(cardNumber);
//   const gallery = await Gallery.find({}).limit(galleryNumber);
//   const name="here";
//   res.render("list",{message:'',names:'',webname:name,categories ,blogs ,cards,gallery});
//   // console.log(categories);
// } catch (error) {
//   res.status(500).send({message: error.message || "Error Ocured"});
// }
});
// route.get("/",function(req,res){
//   res.render("list",{message:'',names:'',webname:name,categories ,blogs ,cards,gallery});
//  });
 route.get("/login",function(req,res){
  res.render("register",{message:''});
 });
 
 route.get("/signup",function(req,res){
  res.render("register",{message:''});
 });
 route.get("/review",function(req,res){
  res.render("card");
 });
//  route.get("/",function(req,res){
//   const name = "here";
//   res.render("list",{webname:name , message:''});
//  });
// //  route.get("/secrets",function(req,res){
//   res.render("secrets");
//  });
 route.get("/secrets",function(req,res){
  if (req.isAuthenticated()){
    res.render("secrets");
  } else{
    res.redirect("/");
  }
 });

 //Login & Signup
// const userSchema =new mongoose.Schema ({
//     fname:String,
//     lname:String,
//     email:String,
//     password:String,
//     rpassword:String
//   });
  // const secret = "Thisisourlittlesecret.";
  // userSchema.plugin(encrypt, {secret: secret , encryptedFields: ["password" ,"rpassword"]});
  // const User = new mongoose.model("User", userSchema);
  
  
  //  route.post("/signup",function(req,res){
  //   const newUser = new User({
  //     fname: req.body.fname,
  //     lname: req.body.lname,
  //     email:req.body.email,
  //     password:req.body.password,
  //     rpassword:req.body.rpassword
  //   });
  //   newUser.save(function(err){
  //     if(err){
  //       console.log(err);
  //     } else {
  //       res.render("login");
  //     }
  //   });
  // });

// Login Signup  


route.post("/signup", async (req, res) => {
    // Checking that user filled in all fielddfbs
  const { name,email, phone, password, cpassword } = req.body; 

  if (!name || !email || !phone || !password || !cpassword) {
    return res.render("register", {message: "Please fill in all fields"});
  }else if(password !== cpassword) {
    return res.render("register", {message: "Passwords do not match"});
  } else if(phone.length !== 10){
  return res.render("register", {message: "Please enter a valid phone number"});
  }
else{

  try {
    // Checking user exists or not
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.render('register',{ message: "mail registred"});
    }
    // At the end creating a new user
    const newUser = new User({ name, email,phone, password , cpassword });
    const createUser = await newUser.save();
    if (createUser) {
      // console.log(md5('password'));
     return  res.render('register',{ message: "user created" });
    }
  } catch (err) {
    console.log(err);
  }
}

});


//Login Page
route.post("/login", async function(req,res){
  const username = req.body.email;
  const password = req.body.password;
  const categories = await Category.find({}).limit(8);
  const blogs = await Blogs.find({}).limit(3);
  const cards = await Cards.find({}).limit(4);
  const gallery = await Gallery.find({}).limit(20);
  User.findOne({email:username},function(err,foundUser){
    if(err){
      console.log(err);
    } else{
      if(foundUser){
       bcrypt.compare(password,foundUser.password,function(err,result){
        if(result==true) {
          console.log(foundUser.name);
        //  return res.redirect("/");
        
         return res.render("list",{message:'Logged in Successfully',blogs:blogs,names:foundUser.name,cards:cards,categories:categories,gallery:gallery});
       
          // return res.render("register",{message:'Hey !! ' + foundUser.name + ' Welcome to Our Website',});
        }
        else{
          return res.render("register",{message:'Something went wrong'});
        }
       });
        
      }
      else {
        return res.render("register",{message:'Something went wrong'});
      }
    }
  });
});
//session login
route.post("/login",function(req,res){
User.register({email:req.body.email},req.body.password,function(err,user){
  if(err){
    console.log(err);
    res.redirect("/");
  } else{
    passport.authenticate("local")(req,res,function(){
      res.redirect("/secrets");
    });
  }
});
});
//session login
module.exports = route;
