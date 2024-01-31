const cloudinary = require("cloudinary").v2
          
cloudinary.config({ 
  cloud_name: 'dlijacsdm', 
  api_key: '563853537865391', 
  api_secret: process.env.CLOUDINARY_SECRET,
});

module.exports = cloudinary;
