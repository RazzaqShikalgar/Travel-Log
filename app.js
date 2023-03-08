require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const session = require('express-session');
// const models = require()
const routes = require('./routes/routes.js');
const passport = require("passport");
const encrypt = require("mongoose-encryption");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
// //Models and Controller Exports --------------------------------
// const a = require('./controllers/photocontroller.js');
// const blogs = require('./controllers/blogcontroller.js');
// const gallery = require('./controllers/gallerycontroller.js');
// const cards = require('./controllers/cardscontroller.js');
// const Category = require('./models/category');
// const Blogs = require('./models/blogs');
const User = require('./models/signup');
// const Cards = require('./models/cards');
// const Gallery = require('./models/gallery');

const app = express();


app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: "Our Little Secret.",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
// mongoose.set("useCreateIndex", true);

app.use(routes);
// a();
// blogs();
// cards();
// gallery();
// app.use(models);
// -----------Card  Data------------

// app.get('/',async(req,res) => {
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
// });
// --------------------------------------------------
// session
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// session
app.listen(3000 , function() {
  console.log("Server started on port 3000.");
});


 