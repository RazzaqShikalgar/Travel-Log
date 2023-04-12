const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: "dsswjmlin",
    api_key: "164156195648782",
    api_secret: "jzH8Kn65JibCVdvmBBcMJ8yZ55U",
  });

// Define controller methods
const imageController = {
  uploadImage: async (req, res) => {
    try {
      // Extract image file from request body
      const { file } = req;

      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(file.path);

      // Send response with image URL
      res.status(200).json({
        message: 'Image uploaded successfully',
        imageUrl: result.secure_url
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Error uploading image'
      });
    }
  }
};

// Export controller methods
module.exports = imageController;