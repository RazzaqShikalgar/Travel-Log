const express = require('express');
const router = express.Router();
const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: "dsswjmlin",
    api_key: "164156195648782",
    api_secret: "jzH8Kn65JibCVdvmBBcMJ8yZ55U",
  });
//Require controller modules 
const blogsControllers = require('../controllers/blogsControllers');

router.get('/', blogsControllers.index);
router.post('/', blogsControllers.insert);
// router.put('/update/:id', blogsControllers.update);
// router.delete('/delete/:id', blogsControllers.delete);


module.exports = router;