const prisma = require("../config/pirsma")
const createError = require("../utils/createError")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const cloudUpload = require("../utils/cloudUpload")
const userService = require("../service/userService")
const { v4: uuidv4 } = require("uuid")

exports.register = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password1, password2, phone, identityNumber, address, zipcode, city, district } = req.body;
        if (!firstName || !lastName || !email || !password1 || !password2) {
            throw createError(400, "Missing parameters");
        }

        if (password1 !== password2) {
            throw createError(400, 'Passwords do not match');
        }

        const userExist = await userService.getUserByEmail(email)

        if (userExist) {
            throw createError(409, 'Email already in use');
        }

        const   identityNumberExist = await userService.getuserByIdentity(identityNumber)

        if (identityNumberExist) {
            throw createError(409, 'identityNumber already in use');
        }

        const hashedPassword = await bcrypt.hash(password1, 10);
        const url = await cloudUpload(req.file.path);
        const userId = uuidv4().replace(/-/g, '');

        const existingUserWithId = await userService.getUserByID(userId)
        if (existingUserWithId) {
            throw createError(400, "Bad Request: Id already in use");
        }

        await userService.createUser(userId, firstName, lastName, email, hashedPassword, phone, identityNumber, address, zipcode, city, district, url)

        res.status(201).json({ message: "register success", user: req.body });
    } catch (err) {
        next(err); // ส่งข้อผิดพลาดไปยัง middleware ถัดไป
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const userExist = await userService.getUserByEmail(email)

        if (!userExist) {
            throw createError(401, "Authentication failed! Wrong email or password")
        }

        const isMatch = await bcrypt.compare(password, userExist.password);

        if (!isMatch) {
            throw createError(401, "Invalid Password")
        }

        const token = jwt.sign({ id: userExist.id }, process.env.SECRET_KEY, { expiresIn: process.env.EXPIRES_IN })
        res.status(200).json({ message: "login success", token: token });
    } catch (err) {
        next(err);
    }
}

exports.forgetPassword = (req, res, next) => {
    res.json({ message: req.user })
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
