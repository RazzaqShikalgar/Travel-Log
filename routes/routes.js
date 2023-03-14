const express = require('express');
const app = express();
const route = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passport = require("passport");
const session = require('express-session');
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
const path= require('path');
const Gallery = require('../models/gallery');
const multer= require('multer');
const jwt = require("jsonwebtoken");
// const jwt = require("jsonwebtoken");
//models

const User = require("../models/signup.js");


app.use(session({
  secret: "Our Little Secret.",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// Upload MiddleWare function

const uploads = path.join(__dirname,"../public/uploads/");
var upload = multer({
      storage:multer.diskStorage({
        destination:function(req,file,cb){
          cb(null,uploads)
        },
        filename:function(req,file,cb){
          cb(null,file.originalname)
        }
      })
}).single("image")




route.get('/',check,async(req,res) => {
  // const name="here";
  const categories = await Category.find({}).limit(8);
  const blogs = await Blogs.find({}).limit(3);
  const cards = await Cards.find({}).limit(4);
  const gallery = await Gallery.find({}).limit(20);
  res.render("list",{message:'',names:req.data.name,images:req.data.image,categories,blogs,cards,gallery});
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
//  route.get("/secrets",function(req,res){
//   if (req.isAuthenticated()){
//     res.render("secrets");
//   } else{
//     res.redirect("/");
//   }
//  });

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
// const uploads = path.join(__dirname,"/public/upload");
// const upload = multer({
// Storage: multer.diskStorage({
//   destination:function(req,file,cb){
//     cb(null,upload)
//   },
//   filename:function(req,file,cb){
//     cb(null,file.originalname)
//   }
//   })
// }).single('file');


route.post("/signup",upload, async (req, res) => {
  
  JWT_SECRET = 'goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu'

  const { name,email, phone, password, cpassword } = req.body; 
  // const image = imageFile;

  if (!name || !email || !phone || !password || !cpassword) {
    return res.render("register", {message: "Please fill in all fields"});
  }else if(password !== cpassword) {
    return res.render("register", {message: "Passwords do not match"});
  } else if(phone.length !== 10){
  return res.render("register", {message: "Please enter a valid phone number"});
  }
else{

  try {
    const image = req.file.filename;
    // Checking user exists or not
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.render('register',{ message: "mail registred"});
    }
    // At the end creating a new user
    const token = jwt.sign({ email },JWT_SECRET,{expiresIn : "2h"});
    const newUser = new User({ name, email,phone, password , cpassword,image,token});
    const createUser = await newUser.save();
       if (createUser) {
      // console.log(md5('password'));
     return  res.render('register',{ message: "user created" });
    } else{
      res.render('register',{message:"something went wrong"});
    }
    
  } catch (err) {
    console.log(err);
  }
}
});

// Middleware function for checking the user is legit or not
async function check (req,res,next){
  const JWT_SECRET = "goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";
    const token = req.cookies.jwtToken;
    if (!token) {
     return res.render('register',{message:''});
    }

    try{
      const data = jwt.verify(token,JWT_SECRET);
      const user = await User.findOne({email:data.email});
      req.data = user;

      next();
  
    }catch(err){
      res.clearCookie('jwtToken');
      return res.render('register',{message:''});
    }
}



//Login Page
route.post("/login", async function(req,res){
  // const aut = User.register({name:req.body.name},req.body.password);
  JWT_SECRET = 'goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu'
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
          // console.log(foundUser.image);
        //  return res.redirect("/");
        const email = foundUser.email;
        const token = jwt.sign({ email },JWT_SECRET,{expiresIn:"2h"});
        return res.cookie('jwtToken',token,{expires:new Date(Date.now() + 25892000000),httpOnly:true}).render("list",{ message: "Logged in Successfully",blogs:blogs,names:'',images:'',cards:cards,categories:categories,gallery:gallery });
        //  return res.cookie("list",{message:'Logged in Successfully',blogs:blogs,names:foundUser.name,images:foundUser.image,cards:cards,categories:categories,gallery:gallery});
       
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
// route.post("/login",function(req,res){
// User.register({username:req.body.email},req.body.password,function(err,user){
//   if(err){
//     console.log(err);
//     res.redirect("/");
//   } else{
//     passport.authenticate("local")(req,res,function(){
//       res.redirect("/secrets");
//     });
//   }
// });
// });
//session login
module.exports = route;
