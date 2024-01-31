const cloudinary = require("../config/cloudinary")

const cloudUpload = async (path) => {
    const res = await cloudinary.uploader.upload(path)
    console.log(res)
    return res.secure_url;
}

module.exports = cloudUpload