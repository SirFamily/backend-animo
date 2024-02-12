const prisma = require("../config/pirsma");
const createError = require("../utils/createError");
const jwt = require("jsonwebtoken")

const authenticate = async (req, res, next) => {
    try {
        const { authorization } = req.headers
        if (!authorization) {
            return res.status(401).json({ msg: "No token provided" })

        }
        const arrayToken = authorization.split(" ");
        const token = arrayToken[1];
        if (arrayToken[0] !== "Bearer" || !token) {
            return createError(400, "not token")
        }
        console.log(arrayToken)
        const payload = jwt.verify(token, process.env.SECRET_KEY)
        console.log(payload)
        if (typeof payload !== "object" || !payload?.id || typeof payload.id !== "string") {
            return createError(400, "payload is invalid")
        }
        const user = await prisma.user.findUnique({
            where: {
                id: payload.id
            }
        })
        console.log(payload)
        if (!user) {
            return createError(400, "user not found")
        }
        delete user.password;   
        req.user = user
        next()
    } catch (err) {
        next(err)
    }
};

module.exports = authenticate