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
const Blacklist = require("../models/blacklist");
// const User = require('../models/signup');
const Cards = require("../models/cards");
const Connect = require("../models/connectus");
const DataModel = require("../models/data");
const path = require("path");
// const blogsControllers = require('../controllers/blogsControllers');
const Gallery = require("../models/gallery");
const fetch = require("node-fetch");
// import fetch from "node-fetch";
const multer = require("multer");
const jwt = require("jsonwebtoken");

const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload");
const UserLike = require('../models/gallerylikes.js');
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

const uploads = path.join(__dirname, "./views/assets/imgs");
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

// route.use(
//   fileUpload({
//     useTempFiles: true,
//   })
// );

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
    // console.log(user._id);
    next();
    return;
  } catch (err) {
    res.clearCookie("jwtToken");
    return res.render("register", { message: "" });
  }
}

route.get("/", check, async (req, res) => {
  // const name="here";
  const categories = await Category.find({}).sort({ _id: -1 }).limit(25);
  const blogs = await Blogs.find({}).sort({ _id: -1 }).limit(6);
  const cards = await Cards.find({}).sort({ _id: -1 }).limit(4);
  const gallery = await Gallery.find({}).sort({likes: -1}).limit(20);
  const isAuthenticated = req.data ? true : false;

  res.render("list", {
    message: "",
    isAuthenticated,
    user: req.data,
    categories,
    blogs,
    cards,
    gallery,
  });

  // route.post("/blog-comment",async(req,res)=>{
  //   const {email,doyoutravel,whyconnect} = req.body;
  //   console.log(email,doyoutravel,whyconnect,"this is your comment");
  // });
//BLogs mandvi
// route.get('/', blogsControllers.index);
// const file = req.files.image;
//   cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
//     console.log(result.url); });
// route.post('/', upload, blogsControllers.insert);

  //Gallery Likes

  route.post("/like/:id", check, async (req, res) => {
    try {
      const galleryid = req.params.id;
      const user = req.data;
      // Find the user's likes document or create a new one if it doesn't exist
      let userLikes = await UserLike.findOne({ userid: user._id,});
  
      if (!userLikes) {
        userLikes = new UserLike({
          userid: user._id,
          username:user.name,
          items: [],
        });
      }
  
      // Find the gallery image to be liked
      const galleryImage = await Gallery.findById(galleryid);
  
      if (!galleryImage) {
        return res.status(404).json({ message: "Gallery image not found" });
      }
  
      // Check if the gallery image is already liked by the user
      const existingLike = userLikes.items.find(
        (item) => item.galleryId.toString() === galleryid
      );
  
      if (existingLike) {
        // If the gallery image is already liked by the user, increment the count
        res.redirect("/?message=Already+liked+this+image");
        // userLikes.Total += userLikes.items.length;
        
      } else {
        // If the gallery image is not already liked by the user, add it to the items array
        const newLike = {
          galleryId: galleryImage._id,
          Image: galleryImage.image,
          Title: galleryImage.namee,
          postedby:galleryImage.postedby,
          description:galleryImage.description,
        };
        userLikes.items.push(newLike);
        // const userlikedid = userLikes._id;
        // console.log(userlikedid);
        // Increment the number of likes for the gallery image
        galleryImage.likes += 1;
        await galleryImage.save();
      }
      userLikes.Total = userLikes.items.length;
      // Save the updated likes document to the database
      const savedLikes = await userLikes.save();
      //Adding like database id to usre database 
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {gallerylike:savedLikes._id },
      { new: true }
    );
    console.log("id added to user database",updatedUser);
      console.log("Likes saved to database:", savedLikes);
      res.redirect("/?message=Thank+you+for+liking+the+image!");
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });
});
  
route.get("/login", function (req, res) {
  res.render("register", { message: "" });
});

route.get("/signup", function (req, res) {
  res.render("register", { message: "" });
});
route.get("/review", function (req, res) {
  res.render("card");
});
route.get("/view-template", check, function (req, res) {
  const isAuthenticated = req.data ? true : false;
  if (isAuthenticated) {
    return res.render("template");
  } else {
    res.render("register", { message: "Please Login To Access Other Pages" });
  }
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
  const isAuthenticated = req.data ? true : false;
  if (!isAuthenticated) {
    return res.redirect("/login");
  }
  
  res.render("blog", { isAuthenticated, user: req.data });
});

// route.get("/location/:id", check, async (req, res) => {
//   const id = req.params.id;
//   // const name = req.params.namee;
//   // console.log(name);
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
  const name = req.params.namee;
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
      "X-RapidAPI-Key": "a856ca1c7fmsh09f7a19da3c4b0ep13105ejsn20ee4fbe0a74",
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
      "X-RapidAPI-Key": "a856ca1c7fmsh09f7a19da3c4b0ep13105ejsn20ee4fbe0a74", //change5
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
      "X-RapidAPI-Key": "a856ca1c7fmsh09f7a19da3c4b0ep13105ejsn20ee4fbe0a74", //change5 //Attractions
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
      "X-RapidAPI-Key": "a856ca1c7fmsh09f7a19da3c4b0ep13105ejsn20ee4fbe0a74", //Free Images
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
      "X-RapidAPI-Key": "a856ca1c7fmsh09f7a19da3c4b0ep13105ejsn20ee4fbe0a74", //change4
      "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
    },
  };
  const response9 = await fetch(url9, options9);
  const lodging = await response9.json();
  // console.log(lodging.data);
  // console.log(lodging.data[0].result_type);  //lodging data

  //hotels travel advisor

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
      "X-RapidAPI-Key": "a856ca1c7fmsh09f7a19da3c4b0ep13105ejsn20ee4fbe0a74", //Getting Hotel Details
      "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
    },
  };
  const response = await fetch(url, options);
  const hoteldetails = await response.json();
  // console.log(hoteldetails.website);
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
      "X-RapidAPI-Key": "a856ca1c7fmsh09f7a19da3c4b0ep13105ejsn20ee4fbe0a74",
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

const url = 'https://travel-places.p.rapidapi.com/';

const options = {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': 'a856ca1c7fmsh09f7a19da3c4b0ep13105ejsn20ee4fbe0a74',
    'X-RapidAPI-Host': 'travel-places.p.rapidapi.com'
  },
  body: '{"query":"{ getPlaces(categories:[\"Beach\"] lat:18.936844,lng:72.8291 country:\"India\",maxDistMeters:50000) { name,lat,lng,abstract,distance,categories } }"}'
};

fetch(url, options)
	.then(res => res.json())
	.then(json => console.log(json))
	.catch(err => console.error('error:' + err));
  //Free Images
  // const url1 = `https://free-images-api.p.rapidapi.com/images/${category}`;
  // const options1 = {
  //   method: "GET",
  //   headers: {
  //     "X-RapidAPI-Key": "d77add82cfmsh1959a000594fd5ep1f01bfjsn36e5b2341ddfxx", //change4 //Free Images
  //     "X-RapidAPI-Host": "free-images-api.p.rapidapi.com",
  //   },
  // };
  // const response1 = await fetch(url1, options1);
  // const image = await response1.json();

  // const url = `https://travel-advisor.p.rapidapi.com/locations/search?query=${category}&limit=30&offset=0&units=km&currency=INR&sort=relevance&lang=en_IN`;

  // const options = {
  //   method: "GET",
  //   headers: {
  //     "X-RapidAPI-Key": "7611234a50msh732a7ada9e7edb9p1aa68djsnd0e23ba84536",
  //     "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
  //   },
  // };
  // const response = await fetch(url, options);
  // const location = await response.json();
  // console.log(image);
  // console.log(location.data);
  res.render("carddetail", {
    image: image.results,
    location: location.data[0],
  });
});

route.get("/profile", check, async(req, res)=>{
  const user_id = req.data._id;
  const galleryids = req.data.gallerylike; //getting the galleryid from user database
  // const user_id = mongoose.Types.ObjectId(req.data._id)
//  console.log(galleryids);
 const galleryid = await UserLike.find({_id:galleryids})
  // console.log(galleryid);
  const items1 = galleryid[0];
  // console.log(items1);
  const email = req.data.email;
  const number = req.data.phone;
  const name = "mumbai";
  const uploads =  await Blogs.findById({userid:user_id});
  console.log(uploads);
  res.render("profile", {
    names: req.data.name,
    images: req.data.image,
    email,
    number,
    likes:items1,
    likedata:items1.items
  });
});

route.get("/view-liked-posts",check,async(req,res)=>{
  const user_id = req.data._id;
  const galleryids = req.data.gallerylike; //getting the galleryid from user database
  // const user_id = mongoose.Types.ObjectId(req.data._id)
//  console.log(galleryids);
 const galleryid = await UserLike.find({_id:galleryids})
  console.log(galleryid);
  const items1 = galleryid[0];
  console.log(items1);
  // res.redirect("/");
  res.render("viewliked",{likes:items1,likedata:items1.items});
});

route.post("/view-liked-posts",check,async(req,res)=>{
  res.render("viewliked",{userlike});
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

route.get("/admin/categoryupload", function (req, res) {
  res.render("categoryform", { message: "" });
});
route.get("/places", function (req, res) {
  res.render("places");
});

route.post("/admin/imageupload",check,async(req,res,next) => {
  const file = req.files.image;
  try {
    const cloudinaryResult = await cloudinary.uploader.upload(file.tempFilePath);

    const namee = req.body.namee;
    const description = req.body.description;
    const image = cloudinaryResult.url;
    const postedby = req.data.name;
    const newImage = await Gallery({ namee, description, image,postedby});
    await newImage.save();

    return res.render("Imageform", { message: "Document added successfully" });
  } catch (error) {
    console.error(error);
    return res.render("Imageform", { message: "Error uploading image" });
  }
});
route.post("/admin/categoryupload",async(req, res, next) => {
  const file = req.files.image;
  cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
    console.log(result.url);
    // res.json(result);
    const namee = req.body.namee;
    const description = req.body.description;
    const image = result.url;
    const category = req.body.category;
    const newImage = await Category({ namee, category, description,image});
    newImage.save();
    return res.render("categoryform", {
      message: "Document Added Successfully",
    });
  });
});

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
// route.get("/uploadng-image-blog",{

// });
route.post("/uploadng-image-blog",async (req, res) => {
  try {
    let data = JSON.parse(JSON.stringify(req.body));
    const result = await cloudinary.uploader.upload(req.file.path);
    data.blogTitleImg = result.secure_url;
    let newblogs = new blogs(data);
    await newblogs.save();
    res.send("Blog added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding blog");
  }
});

route.post("/signup",async (req, res) => {
  const file = req.files.image;
  cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
    console.log(result.url);

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
      const image = result.url;
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
});

route.post("/connect-us",async(req,res)=>{
 const {email ,doyoutravel,whyconnect} = req.body;
 console.log(email,doyoutravel,whyconnect);
 const newquery = new Connect({
  email,
  doyoutravel,
  whyconnect,
 });
 const question = await newquery.save();
 console.log(question,"Saved");
 res.render("advisor");
});

route.post('/logout', async (req, res) => {
  try {
    // Retrieve the JWT token from the Authorization header
    const authHeader = req.cookies['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // If the token is present, blacklist it
    if (token) {
      const blacklist = new Blacklist({ token });
      await blacklist.save();
    }
    const isAuthenticated = req.data ? true : false;
    // Clear the JWT token from the user's browser
    res.clearCookie('jwtToken',token);
    

    // Send a JSON response indicating that the logout was successful
    res.redirect('/');
    // res.render('list',{message:"Logout Successfully",isAuthenticated});
    // res.status(200).json({ message: 'Logout successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});
route.get("/blog/upload",async(req,res)=>{
res.render("userblog");
});
route.post("/blog/upload",async(req,res)=>{
 const {blogTitle,blogCity,blogCountry,blogPlace,blogDescription,blogTransport,blogDate,blogBudget,blogCategory} = req.body;
 
});

//Login Page
route.post("/login", async(req, res)=>{
  // const aut = User.register({name:req.body.name},req.body.password);
  JWT_SECRET =
    "goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";
  const username = req.body.email;
  const password = req.body.password;
  const categories = await Category.find({}).limit(8);
  const blogs = await Blogs.find({}).limit(3);
  const cards = await Cards.find({}).limit(4);
  const gallery = await Gallery.find().limit(20);
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

route.post('/search',async(req, res) => {
  const query = req.body.search;
  console.log(query);
  res.render('')
});

module.exports = {route,check};
