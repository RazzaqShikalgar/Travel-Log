const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require("body-parser");
const multer =  require("multer");
const fileUpload = require("express-fileupload");
//Require controller modules 
const blogsControllers = require('../controllers/blogsControllers');
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const check = require("../routes/routes.js")

cloudinary.config({
  cloud_name: "dsswjmlin",
  api_key: "164156195648782",
  api_secret: "jzH8Kn65JibCVdvmBBcMJ8yZ55U",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "blogs",
    allowed_formats: ["jpg", "png","jpeg"],
    // transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});
const upload = multer({ storage: storage });
router.get('/', blogsControllers.index);

router.post("/", upload.single("image"), blogsControllers.insert);
// console.log(req.file);
// router.put('/update/:id', blogsControllers.update);
// router.delete('/delete/:id', blogsControllers.delete);
router.use(
  fileUpload({
    useTempFiles: true,
  })
);
router.use(bodyParser. text({type: '/'}));
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
router.use(bodyParser.json());
module.exports = router;