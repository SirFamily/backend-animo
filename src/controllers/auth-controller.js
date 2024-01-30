const prisma = require("../config/pirsma")
const createError = require("../utils/createError")
const bcrypt = require('bcrypt')
exports.register = async (req, res, next) => {
    try {
        const { firstName,
            lastName,
            email,
            password1,
            password2,
            phone,
            identityNumber,
            address,
            city,
            district,
            img_profile
        } = req.body;
        if (!firstName || !lastName || !email || !password1 || !password2) {
            throw createError(400, "Missing parameters");
        }

        if (password1 !== password2) {
            throw createError(400, 'Passwords do not match');
        }

        const userExist = await prisma.user.findUnique({ where: { email: email } })

        if (userExist) {
            throw createError(409, 'Email already in use');
        }
        //hash the password 
        const hashedPassword = await bcrypt.hash(password1, 10);
        const newUser = await prisma.user.createMany({
            data: [{
                firstName,
                lastName,
                email,
                password: hashedPassword,
                phone,
                identityNumber,
                address,
                city,
                district,
                img_profile
            }],
            skipDuplicates: true
        })
        console.log('Request Body:', req.body);
        res.status(201).json({ user: newUser })
    } catch (err) {
        next(err)
    }
}



exports.login = async (req, res, next) => {
    res.json({ message: "login" })
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