const createError = require("../utils/createError")
const roomService = require("../service/roomService")
const prisma = require("../config/pirsma")
const cloudUpload = require("../utils/cloudUpload")




exports.addRoom = async (req, res, next) => {
    try {
        const { roomName,
            description,
            maximumAnimal,
            pricePerNight,
            state,
            typeRoom,
        } = req.body
        const maximumAnimalNum = Number(maximumAnimal)
        const numPricePerNight = Number(pricePerNight)

        if (!roomName || !description
            || typeof maximumAnimalNum !== 'number'
            || !state) throw createError(400, "Missing parameters or wrong type.")

        const { hostId } = req.params

        if (!hostId) {
            throw createError(400, 'Host ID is missing')
        }
        const imagexPromiseArray = req.files.map((file) => {
            return cloudUpload(file.path)
        })

        const imgUrlArray = await Promise.all(imagexPromiseArray)

        const roomExits = await roomService.addRoom({
            roomName,
            description,
            maximumAnimal: maximumAnimalNum,
            pricePerNight: numPricePerNight,
            typeRoom,
            hostId: Number(hostId)
        })

        const roomId = Number(roomExits.id)
        
        if (typeof roomId !== 'number') {
            throw createError(400, 'Invalid roomId');
        }

        const images = imgUrlArray.map((imgUrl) => {
            return {
                urlImg: imgUrl,
            }
        })
        await roomService.uploadImgRoom({ images, roomId });




        res.json({ images })
    } catch (err) {
        next(err)
    }
}


exports.gerRoomAllByToken = async (req, res, next) => {
    try {
        userId = req.user.id
        const getHost = await roomService.getRoomAllByToken({ userId })
        console.log(getHost)
        res.json({ getHost });
    } catch (err) {
        next(err);
    }
};


exports.getRoomByHostForUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const userId = req.user.id
        console.log(userId)
        const room = await roomService.getRoomByHost(Number(id))
        res.json({ user: userId, room: room })

    } catch (err) { 
        next(err)
    }
}

exports.delRoomByHost = async (req, res, next) => {
    try {
        const { roomId } = req.params
        const { hostId } = req.params
        const userId = req.user.id
        const userHost = await roomService.getHostByIdUser(userId)
        const getHost = await roomService.findRoomForDel( roomId )

        if(userHost.id !==Number(hostId)){
            throw createError(400,"err")
        }
        
        
        
        console.log({hostIdFormdata:userHost})
        console.log({hostIdFormparams:getHost})
        await roomService.delRoom(roomId,hostId)
        res.json({ getHost })


    } catch (err) {
        next(err)
    }
}