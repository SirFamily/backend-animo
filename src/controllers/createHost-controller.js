const { json } = require("express")
const createError = require("../utils/createError")

//สร้างhostแชร์บ้านและ
exports.createHome = async(req,res,next)=>{
    res.json({message:"Create host"})
}

//gethost
exports.getAllHome = async(req,res,next)=>{
    res.json({message:"getALLhost"})
}

exports.getHome = async(req,res,next)=>{
    const {host_id} = req.params
    res.json({host_id})
}

//แก้ไขข้อมูล
exports.updateHome = (req,res,next) => {
    const {host_id} = req.params
    res.json({host_id})
}
//ลบข้อมูล
exports.deleteHome = (req, res, next) => {
    const { host_id } = req.params;
        res.json({ message: "Delete House " + host_id });
   
}
