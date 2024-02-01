const createError = require("../utils/createError")
const roomService = require("../service/roomService")



exports.gerRoomAllByToken = async (req, res, next) => {
    try {
        userId = req.user.id
        const getHost = await roomService.getHostById({userId})
        console.log(getHost)
        res.json({message:userId});
    } catch (error) {
        next(error);
    }
};