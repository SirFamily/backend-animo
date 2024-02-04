const createError = require("../utils/createError")

exports.createBooking = async (req,res,next) => {
    try{
        const {getHostById,roomid} = req.params
        const userId = req.user.id
        //เดียวกลับมาใส่นะครับ กลัวไม่ทัน เดียวไปทำfontก่อน
        
        console.log(getHostById,roomid,userId)
        res.json({getHostById,roomid,userId})
    }catch(err){
        next(err)
    }
}