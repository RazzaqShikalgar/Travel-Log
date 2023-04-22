require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors') ;
const blogsRoutes = require( './api/routes/blogs' ) ;
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
// const session = require('express-session');
// const models = require()
const routes = require("./routes/routes.js");
const cookieParser = require("cookie-parser");
const multer = require('multer');
const passport = require("passport");
const encrypt = require("mongoose-encryption");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;

// const blogsRoutes = require( './api/routes/blogs' ) ;
// //Models and Controller Exports --------------------------------
// const a = require('./controllers/photocontroller.js');
// const blogs = require('./controllers/blogcontroller.js');
// const gallery = require('./controllers/gallerycontroller.js');
const placess = require("./controllers/placecontroller.js");
// const cards = require('./controllers/cardscontroller.js');
// const Category = require('./models/category');
// const Blogs = require('./models/blogs');
const Places = require("./models/place.js");
const User = require("./models/signup");
// const Cards = require('./models/cards');
// const Gallery = require('./models/gallery');

const app = express();

cloudinary.config({
  cloud_name: "dsswjmlin",
  api_key: "164156195648782",
  api_secret: "jzH8Kn65JibCVdvmBBcMJ8yZ55U",
});

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
// app.use(session({
//   secret: "Our Little Secret.",
//   resave: false,
//   saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
// mongoose.set("useCreateIndex", true);
app.use(cors( )) ;
app.use(bodyParser.json());
app.use(bodyParser. text({type: '/'}));
app.use(routes);
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.post("upload/cloud", async (req, res) => {
  const file = req.files.image;
  const result = await cloudinary.uploader.upload(file.tempFilePath, {
    public_id: `${Date.now()}`,
    resource_type: "auto",
    folder: "images",
  });
  res.json(result);
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});
const upload = multer({ storage: storage });


app.use('/api/blogs', blogsRoutes) ;

app.get('/ui', function(req, res) {
  res.render('index');
  // C:/api/views/.ejs
});
app.get('/ui/home', function(req, res) {
  res.render('index');
  // C:/api/views/.ejs
});
app.get('/ui/createBlog', function(req, res) {
  res.render('createBlog');
  // C:/api/views/.ejs
});
app.get('/ui/myBlogs', function(req, res) {
  res.render('myBlogs');
  // C:/api/views/.ejs
});

// a();
// blogs();
// cards();
// gallery();
// placess();
// app.use(models);
// -----------Card  Data------------

// --------------------------------------------------
// session
// passport.use(User.createStrategy());
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
// session
app.listen(3000, function () {
  console.log("Server started on port 3000.");
});
