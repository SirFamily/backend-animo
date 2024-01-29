const createError = require("../utils/createError")

exports.register = async(req,res,next)=>{
    res.json({message:"register"})
}

exports.login = async(req,res,next)=>{
    res.json({message:"login"})
}

exports.forgetPassword = (req, res, next) => {
    const { email } = req.body
    res.json({ message: "forget password" })
}

exports.verifyForgetPassword = (req, res, next) => {
    const { token } = req.params
    res.json({ token })

}

exports.resetPassword = (req, res, next) => {
    const { token } = req.params
    const { password } = req.body
    res.json({ token, password })
}