const express = require("express");
const app = express();
const route = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const passport = require("passport");
const session = require("express-session");
// const cards = require('../controllers/cardscontroller.js');
// const saltRound=10;
// const encrypt = require("mongoose-encryption");
//Models and Controller Exports --------------------------------
const a = require("../controllers/photocontroller.js");
const blogs = require("../controllers/blogcontroller.js");
const gallery = require("../controllers/gallerycontroller.js");
const cards = require("../controllers/cardscontroller.js");
// const placess = require('./controllers/placecontroller.js');
const Category = require("../models/category");
const Blogs = require("../models/blogs");
const Place = require("../models/place");
// const User = require('../models/signup');
const Cards = require("../models/cards");
const DataModel = require("../models/data");
const path = require("path");
const Gallery = require("../models/gallery");
const fetch = require("node-fetch");
// import fetch from "node-fetch";
const multer = require("multer");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload");
// const jwt = require("jsonwebtoken");
//models

const User = require("../models/signup.js");
const { Console, log } = require("console");

// app.use(session({
//   secret: "Our Little Secret.",
//   resave: false,
//   saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(User.createStrategy());
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

cloudinary.config({
  cloud_name: "dsswjmlin",
  api_key: "164156195648782",
  api_secret: "jzH8Kn65JibCVdvmBBcMJ8yZ55U",
});

// Upload MiddleWare function

const uploads = path.join(__dirname, "../public/uploads/");
var upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploads);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
}).single("image");

route.use(
  fileUpload({
    useTempFiles: true,
  })
);

route.get("/", check, async (req, res) => {
  // const name="here";
  const categories = await Category.find({}).sort({ _id: -1 }).limit(25);
  const blogs = await Blogs.find({}).sort({ _id: -1 }).limit(6);
  const cards = await Cards.find({}).sort({ _id: -1 }).limit(4);
  const gallery = await Gallery.find({}).sort({ _id: -1 }).limit(20);
  const isAuthenticated = req.data ? true : false;

  res.render("list", {
    message: "",
    isAuthenticated,
    user: req.data,
    // image:,
    categories,
    blogs,
    cards,
    gallery,
  });
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
route.get("/login", function (req, res) {
  res.render("register", { message: "" });
});

route.get("/signup", function (req, res) {
  res.render("register", { message: "" });
});
route.get("/review", function (req, res) {
  res.render("card");
});
route.get("/admin/imageupload", check, function (req, res) {
  const isAuthenticated = req.data ? true : false;
  if (isAuthenticated != true) {
    res.render("/login");
  }
  res.render("imageform", { message: "" });
});

route.get("/explore", check, async (req, res) => {
  const category = await Category.find({}).limit(15);
  // const blogs = await Blogs.find({}).limit(3);
  res.render("explore", {
    names: req.data.name,
    images: req.data.image,
    category: category,
  });
});

route.get("/blog", check, function (req, res) {
  const isAuthenticated = req.data? true:false;
  if(!isAuthenticated){
    return res.redirect("/login");
  }

  res.render("blog", { isAuthenticated , user:req.data});
});

// route.get("/location/:id", check, async (req, res) => {
//   const id = req.params.id;
//   // const placename = req.params.namee;
//   // console.log(placename);
//   // const categorys = req.params.category;
//   const category = await Category.findById(id);
//   console.log(category.namee);
//   const placesss = await Place.find({'category':category.namee});

// // console.log(placesss);
// // const fetch = require('node-fetch');

// // const url = 'https://travel-places.p.rapidapi.com/';

// // const options = {
// //   method: 'POST',
// //   headers: {
// //     'X-RapidAPI-Key': 'f6e6cc3526mshd177f7ed9442d41p100e48jsn6d00b4a7ea6b',
// //     'X-RapidAPI-Host': 'travel-places.p.rapidapi.com'
// //   }
// // };
// const country = category.category;
// const initials = country.slice(0,2);
// // console.log(initials);
// const fetch = require('node-fetch');

// //Latitude & Longitude
// const url = `https://opentripmap-places-v1.p.rapidapi.com/en/places/geoname?name=${category.namee}&country=${initials}`;

// const options = {
//   method: 'GET',
//   headers: {
//     'X-RapidAPI-Key': 'f6e6cc3526mshd177f7ed9442d41p100e48jsn6d00b4a7ea6b',
//     'X-RapidAPI-Host': 'opentripmap-places-v1.p.rapidapi.com'
//   }
// };

// // try{
//   const response = await fetch(url, options);
//   const data = await response.json();
//   const lat= data.lat;
//   const lon = data.lon;
//   const url1 = `https://opentripmap-places-v1.p.rapidapi.com/en/places/radius?radius=5000&lon=${lon}&lat=${lat}&kinds=natural`;
//   console.log(lat)
//   const options1 = {
//     method: 'GET',
//     headers: {
//       'X-RapidAPI-Key': 'f6e6cc3526mshd177f7ed9442d41p100e48jsn6d00b4a7ea6b',
//       'X-RapidAPI-Host': 'opentripmap-places-v1.p.rapidapi.com'
//     }
//   };

//   fetch(url1, options1)
//   .then(res => res.json())
//   .then(json => console.log(json.features[0].properties))
//   .catch(err => console.error('error:' + err));

//   //Location_id
// const url2 = `https://travel-advisor.p.rapidapi.com/locations/auto-complete?query=${category.namee}&lang=en_US&units=km`;

// const options2 = {
//   method: 'GET',
//   headers: {
//     'X-RapidAPI-Key': 'f6e6cc3526mshd177f7ed9442d41p100e48jsn6d00b4a7ea6b',
//     'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
//   }
// };

// const response2 = await  fetch(url2, options2);
// const location_id = await response2.json();
// // console.log(location_id.data.name);
// console.log(location_id.data[0].result_object.location_id);

//Location API

// const url3 = `https://travel-advisor.p.rapidapi.com/attractions/list?location_id=${location_id.data[0].result_object.location_id}&currency=USD&lang=en_US&lunit=km&min_rating=5&sort=recommended`;

// const options3 = {
//   method: 'GET',
//   headers: {
//     'X-RapidAPI-Key': 'f6e6cc3526mshd177f7ed9442d41p100e48jsn6d00b4a7ea6b',
//     'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
//   }
// };

// const response3 =  await fetch(url3, options3)
// const result = await response3.json()
// console.log(data1.data);
// res.render("places",{placesss,names:req.data.name,images:req.data.image,data : location_id.data,result: result.data});

// }catch(e){
// console.log(e);
// }
// 	//Attraction

//   // fetch(url, options)
//   // 	.then(res => res.json())
// // 	.then(json => console.log(json))
// // 	.catch(err => console.error('error:' + err));
//   // console.log(placesss.image);
//   // const fetch = require('node-fetch');

//   // const url = `https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchLocation?query=${category.namee}`;

//   // const options = {
//   //   method: 'GET',
//   //   headers: {
//   //     'X-RapidAPI-Key': 'f6e6cc3526mshd177f7ed9442d41p100e48jsn6d00b4a7ea6b',
//   //     'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
//   //   }
//   // };

// // fetch(url, options)
// // 	.then(res => res.json())
// // 	.then(json =>  console.log(json))
// //   .then((data)=> res.render("places",{placesss,data}))
// // 	.catch(err => console.error('error:' + err));
//   // console.log(placesss);

// // const url1 = `https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchLocation?query=${category.namee}`;

// // const options1 = {
// //   method: 'GET',
// //   headers: {
// //     'X-RapidAPI-Key': '7611234a50msh732a7ada9e7edb9p1aa68djsnd0e23ba84536',
// //     'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
// //   }
// // };

// // fetch(url1, options1)
// // 	.then(res => res.json())
// // 	.then(json => console.log(json))
// // 	.catch(err => console.error('error:' + err));
// });

route.get("/filter", async (req, res) => {
  //North
  const url =
    "https://nomad-list-cities.p.rapidapi.com/nomad-list/asia?size=20&page=1&sort=desc&sort_by=overall_score";

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "d77add82cfmsh1959a000594fd5ep1f01bfjsn36e5b2341ddf",
      "X-RapidAPI-Host": "nomad-list-cities.p.rapidapi.com",
    },
  };
  const response = await fetch(url, options);
  const asia = await response.json();
  // console.log(data);

  //africa
  const url1 =
    "https://nomad-list-cities.p.rapidapi.com/nomad-list/africa?size=20&page=1&sort=desc&sort_by=overall_score";

  const options1 = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "d77add82cfmsh1959a000594fd5ep1f01bfjsn36e5b2341ddf",
      "X-RapidAPI-Host": "nomad-list-cities.p.rapidapi.com",
    },
  };
  const response1 = await fetch(url1, options1);
  const africa = await response1.json();
  res.render("filter", { asia, africa });
});

route.get("/advisor/:id", check, async (req, res) => {
  const id = req.params.id;
  const placename = req.params.namee;
  const category = await Category.findById(id);
  const place = category.namee;
  //Searching Hotels

  //Open Trip Map API
  const url = `https://opentripmap-places-v1.p.rapidapi.com/en/places/geoname?name=${category.namee}&country=IND`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "f6e6cc3526mshd177f7ed9442d41p100e48jsn6d00b4a7ea6b", //change1
      "X-RapidAPI-Host": "opentripmap-places-v1.p.rapidapi.com",
    },
  };
  const response = await fetch(url, options);
  const data = await response.json();
  const lat = data.lat;
  const lon = data.lon;
  const url1 = `https://opentripmap-places-v1.p.rapidapi.com/en/places/radius?radius=5000&lon=${lon}&lat=${lat}&kinds=natural`;
  // console.log(lat)
  const options1 = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "f6e6cc3526mshd177f7ed9442d41p100e48jsn6d00b4a7ea6b", //change2
      "X-RapidAPI-Host": "opentripmap-places-v1.p.rapidapi.com",
    },
  };
  fetch(url1, options1)
    .then((res) => res.json())
    // .then(json => console.log(json.features[0].properties))
    .catch((err) => console.error("error:" + err));

  //Location_id //travel advisor
  const url2 = `https://travel-advisor.p.rapidapi.com/locations/auto-complete?query=${category.namee}&lang=en_US&units=km`;

  const options2 = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "f6e6cc3526mshd177f7ed9442d41p100e48jsn6d00b4a7ea6b",
      "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
    },
  };

  const response2 = await fetch(url2, options2);
  const location_id = await response2.json();
  // console.log(location_id.data);
  // console.log(location_id.data[0].result_object.location_id);

  //Restaurents
  //Travel Advisor
  const url3 = `https://travel-advisor.p.rapidapi.com/restaurants/list?location_id=${location_id.data[0].result_object.location_id}&currency=INR&lunit=km&limit=30&open_now=false&lang=en_US`;
  const options3 = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "f6e6cc3526mshd177f7ed9442d41p100e48jsn6d00b4a7ea6b", //change5
      "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
    },
  };
  const response3 = await fetch(url3, options3);
  const hotel = await response3.json();
  // console.log(hotel.data);

  //Getting lat $ Long //Open Trip Map
  const url5 = `https://opentripmap-places-v1.p.rapidapi.com/en/places/geoname?name=${category.namee}&country=IN`;

  const options5 = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "f6e6cc3526mshd177f7ed9442d41p100e48jsn6d00b4a7ea6b",
      "X-RapidAPI-Host": "opentripmap-places-v1.p.rapidapi.com",
    },
  };

  const response5 = await fetch(url5, options5);
  const data1 = await response5.json();
  const lat1 = data1.lat;
  const lon1 = data1.lon;
  //attractions //Travel Advisor
  const url4 = `https://travel-advisor.p.rapidapi.com/attractions/list-by-latlng?longitude=${lon1}&latitude=${lat1}&lunit=km&currency=INR&distance=25&lang=en_US`;
  const options4 = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "7611234a50msh732a7ada9e7edb9p1aa68djsnd0e23ba84536", //change5 //Attractions
      "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
    },
  };
  const response4 = await fetch(url4, options4);
  const attraction = await response4.json();

  //Free Images
  const url7 = `https://free-images-api.p.rapidapi.com/images/${location_id.data[0].result_object.name}`;
  const options7 = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "d77add82cfmsh1959a000594fd5ep1f01bfjsn36e5b2341ddf", //change4 //Free Images
      "X-RapidAPI-Host": "free-images-api.p.rapidapi.com",
    },
  };

  const response7 = await fetch(url7, options7);
  const image = await response7.json();
  // console.log(image.results);
  const freeimages = image.results; //Image of location

  const url6 = `https://travel-advisor.p.rapidapi.com/photos/list?location_id=${location_id.data[0].result_object.location_id}&currency=INR&limit=30&lang=en_US`;

  const options6 = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "d77add82cfmsh1959a000594fd5ep1f01bfjsn36e5b2341ddf", //Free Images
      "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
    },
  };
  const response6 = await fetch(url6, options6);
  const location_img = await response6.json();
  // console.log(location_img.data);
  // console.log(attraction.data[1].location_id);

  const url9 = `https://travel-advisor.p.rapidapi.com/locations/search?query=${location_id.data[0].result_object.name}&limit=30&offset=0&units=km&location_id=${location_id.data[0].result_object.location_id}&currency=INR&sort=relevance&lang=en_IN`;
  const options9 = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "7611234a50msh732a7ada9e7edb9p1aa68djsnd0e23ba84536", //change4
      "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
    },
  };
  const response9 = await fetch(url9, options9);
  const lodging = await response9.json();
  // console.log(lodging.data[0].result_type);  //lodging data

  res.render("advisor", {
    names: req.data.names,
    images: req.data.image,
    place,
    hotels: hotel.data,
    attraction: attraction.data,
    location: location_id.data[0],
    image: location_img.data,
    freeimages,
    lodging: lodging.data,
  });
  //Hotels Best
});

//save data to database
// route.get('/fetch-data', async (req, res) => {
//   const options = {
//     method: 'GET',
//     headers: {
//       'X-RapidAPI-Key': 'd77add82cfmsh1959a000594fd5ep1f01bfjsn36e5b2341ddf',
//       'X-RapidAPI-Host': 'cost-of-living-and-prices.p.rapidapi.com'
//     }
//   };
//   const data = await fetch('https://cost-of-living-and-prices.p.rapidapi.com/cities',options)
//   console.log(data);
// const jdata = await data.json();
// const cityArray = Object.values(jdata);
//   // Use a for...of loop to save each city to MongoDB
//   for (const city of cityArray) {
//     const newCity = new DataModel(city);
//     await newCity.save();
//   }

//   res.send('Data saved to MongoDB!');
// });

route.get("/locationd/detail/:id", check, async (req, res) => {
  const id = req.params.location_id;
  console.log(id);
  // res.render("detail");
});
//Get Hoetl Details
route.get("/hotel/detail/:id", check, async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const url = `https://travel-advisor.p.rapidapi.com/restaurants/get-details?location_id=${id}&currency=INR&lang=en_IN`;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "7611234a50msh732a7ada9e7edb9p1aa68djsnd0e23ba84536", //Getting Hotel Details
      "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
    },
  };
  const response = await fetch(url, options);
  const hoteldetails = await response.json();
  // console.log(hoteldetails);
  res.render("avail", {
    names: req.data.name,
    images: req.data.image,
    hoteld: hoteldetails,
  });
});

//Trip Planner API
route.post("/planner", check, async (req, res) => {
  const days = req.body.days;
  const loc = req.body.location;
  console.log(days, loc);

  const url = `https://ai-trip-planner.p.rapidapi.com/?days=${days}&destination=${loc}`;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "d77add82cfmsh1959a000594fd5ep1f01bfjsn36e5b2341ddf",
      "X-RapidAPI-Host": "ai-trip-planner.p.rapidapi.com",
    },
  };
  const response = await fetch(url, options);
  const planner = await response.json();
  const plans = planner.plan;
  // console.log(plans);
  res.render("planner", { plans });
});
//cards detail's
route.get("/details/:category", async (req, res) => {
  const category = req.params.category;
  //Free Images
  const url1 = `https://free-images-api.p.rapidapi.com/images/${category}`;
  const options1 = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "d77add82cfmsh1959a000594fd5ep1f01bfjsn36e5b2341ddf", //change4 //Free Images
      "X-RapidAPI-Host": "free-images-api.p.rapidapi.com",
    },
  };
  const response1 = await fetch(url1, options1);
  const image = await response1.json();

  const url = `https://travel-advisor.p.rapidapi.com/locations/search?query=${category}&limit=30&offset=0&units=km&currency=INR&sort=relevance&lang=en_IN`;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "7611234a50msh732a7ada9e7edb9p1aa68djsnd0e23ba84536",
      "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
    },
  };
  const response = await fetch(url, options);
  const location = await response.json();
  // console.log(image);
  // console.log(location.data);
  res.render("carddetail", {
    image: image.results,
    location: location.data[0],
  });
});
// route.get("/planner",check,async(req,res)=>{
//   const days =  req.body.days;
//   const loc = req.body.location;
//   console.log(days,loc);
//   // res.render("detail");
// });
route.get("/profile", check, function (req, res) {
  const email = req.data.email;
  const number = req.data.phone;
  res.render("profile", {
    names: req.data.name,
    images: req.data.image,
    email,
    number,
  });
});

route.get("/category/:id", async (req, res, next) => {
  // const category = await Category.find({_id:id});
  const id = Category._id;
  // console.log(Category._id);
  try {
    const category = await Category.find({ category: id }).limit(15);
    // console.log(category);
    return res.render("exploremore", {
      names: req.data.namee,
      image: req.data.image,
      category,
    });
  } catch (error) {
    console.log("Something Error Occured");
  }
});

route.post("/admin/imageupload", upload, async (req, res) => {
  const namee = req.body.namee;
  const description = req.body.description;
  const image = req.file.filename;
  const newImage = await Gallery({ namee, description, image });
  newImage.save();
  return res.render("Imageform", { message: "Document Added Successfully" });
});
route.get("/admin/categoryupload", function (req, res) {
  res.render("categoryform", { message: "" });
});
route.get("/places", function (req, res) {
  res.render("places");
});

route.post("/admin/categoryupload", async (req, res, next) => {
  const file = req.files.image;
  cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
    console.log(result.url);
    // res.json(result);
    const namee = req.body.namee;
    const description = req.body.description;
    const image = result.url;
    const category = req.body.category;
    const newImage = await Category({ namee, image, category, description });
    newImage.save();
    return res.render("categoryform", {
      message: "Document Added Successfully",
    });
  });
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

route.post("/signup", upload, async (req, res) => {
  JWT_SECRET =
    "goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";

  const { name, email, phone, password, cpassword } = req.body;
  // const image = imageFile;

  if (!name || !email || !phone || !password || !cpassword) {
    return res.render("register", { message: "Please fill in all fields" });
  } else if (password !== cpassword) {
    return res.render("register", { message: "Passwords do not match" });
  } else if (phone.length !== 10) {
    return res.render("register", {
      message: "Please enter a valid phone number",
    });
  } else {
    try {
      const image = req.file.filename;
      // Checking user exists or not
      const userExist = await User.findOne({ email });
      if (userExist) {
        return res.render("register", { message: "mail already registred" });
      }
      // At the end creating a new user
      const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "2h" });
      const newUser = new User({
        name,
        email,
        phone,
        password,
        cpassword,
        image,
        token,
      });
      const createUser = await newUser.save();
      if (createUser) {
        // console.log(md5('password'));
        return res.render("register", { message: "user created" });
      } else {
        res.render("register", { message: "something went wrong" });
      }
    } catch (err) {
      console.log(err);
    }
  }
});

// Middleware function for checking the user is legit or not
async function check(req, res, next) {
  const JWT_SECRET =
    "goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";
  const token = req.cookies.jwtToken;
  if (!token) {
    next();
    return;
  }
  // }  {
  //   elsereturn res.render("register", { message: "" });
  // }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ email: data.email });
    req.data = user;
    next();
    return;
  } catch (err) {
    res.clearCookie("jwtToken");
    return res.render("register", { message: "" });
  }
}

route.get("/logout", check, function (req, res) {
  req.user.removeToken(req.token, (err, user) => {
    if (err) return res.status(400).send(err);
    res.sendStatus(200);
  });
});

//Login Page
route.post("/login", async function (req, res) {
  // const aut = User.register({name:req.body.name},req.body.password);
  JWT_SECRET =
    "goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";
  const username = req.body.email;
  const password = req.body.password;
  const categories = await Category.find({}).limit(8);
  const blogs = await Blogs.find({}).limit(3);
  const cards = await Cards.find({}).limit(4);
  const gallery = await Gallery.find({}).limit(20);
  User.findOne({ email: username }, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        bcrypt.compare(password, foundUser.password, function (err, result) {
          if (result == true) {
            // console.log(foundUser.image);
            //  return res.redirect("/");
            const email = foundUser.email;
            // ,{ message: "Logged in Successfully",blogs:blogs,names:'',images:'',cards:cards,categories:categories,gallery:gallery });
            const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "2h" });
            return res
              .cookie("jwtToken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true,
              })
              .redirect("/");
            //  return res.cookie("list",{message:'Logged in Successfully',blogs:blogs,names:foundUser.name,images:foundUser.image,cards:cards,categories:categories,gallery:gallery});

            // return res.render("register",{message:'Hey !! ' + foundUser.name + ' Welcome to Our Website',});
          } else {
            return res.render("register", { message: "Something went wrong" });
          }
        });
      } else {
        return res.render("register", { message: "Something went wrong" });
      }
    }
  });
});




// route.get('/ui', function(req, res) {
//   res.render('index');
//   // C:/api/views/.ejs
// });
// route.get('/ui/home', function(req, res) {
//   res.render('index');
//   // C:/api/views/.ejs
// });
// route.get('/ui/createBlog', function(req, res) {
//   res.render('createBlog');
//   // C:/api/views/.ejs
// });
// route.get('/ui/myBlogs', function(req, res) {
//   res.render('myBlogs');
//   // C:/api/views/.ejs
// });













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
