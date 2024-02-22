const createError = require("../utils/createError")
const userService = require("../service/userService")
const cloudUpload = require("../utils/cloudUpload");


exports.getUser = async (req, res, next) => {
    req.user
    // delete  req.user.password; อย่าลืมลบ
    res.json(req.user)
}

exports.userPut = async (req, res, next) => {
    try{

    
    const isUserId = req.user.id;
    const isUser = await userService.getUserByID(req.user.id);
    let url = req.user.img_profile;
        if (req.file) {
            url = await cloudUpload(req.file.path);
        }else{
            return
        }
    const {
        firstName,
        lastName,
        phone,
        address,
        zipcode,
        city,
        district,
    } = req.body
    
    if (!isUser) {
        throw createError(400, 'User not found');
    }

    if (isUser.id !== isUserId) {
        throw createError(401, "You don't have permission to edit this account");
    }


    

    await userService.putUserByToken({
        where:{
            id: isUser.id
        },
        data:{
            firstName,
            lastName,
            phone,
            address,
            zipcode,
            city,
            district,
            img_profile: url
        },
        
    })
    res.json({ message:"อัพเดตขอมูลสำเร็จ" });
}catch(err){
    next(err)
}
}
