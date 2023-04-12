const express = require('express');
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const imageController = require('../controllers/imageController');
cloudinary.config({
    cloud_name: "dsswjmlin",
    api_key: "164156195648782",
    api_secret: "jzH8Kn65JibCVdvmBBcMJ8yZ55U",
  });

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
  

//Require controller modules 
const blogsControllers = require('../controllers/blogsControllers');

router.get('/', blogsControllers.index);
router.post('/', blogsControllers.insert,imageController);
// router.put('/update/:id', blogsControllers.update);
// router.delete('/delete/:id', blogsControllers.delete);


module.exports = router;