const createError = require("../utils/createError")

exports.getUser = async(req,res,next)=>{
    const {user_id}=  req.params;
    res.json({message:"user "+user_id})
}

exports.userPut = async(req,res,next)=>{
    const {user_id} = req.params;
    res.json({message:"put  user "+user_id});
}