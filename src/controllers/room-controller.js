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
            typeRoom,
        } = req.body

        const maximumAnimalNum = Number(maximumAnimal)
        const numPricePerNight = Number(pricePerNight)

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
        const data = await roomService.uploadImgRoom({ images, roomId });




        res.json({ data })
    } catch (err) {
        next(err)
    }
}


exports.gerRoomAllByToken = async (req, res, next) => {
    try {
        userId = req.user.id
        const getHost = await roomService.getRoomAllByToken({ userId })
        console.log(getHost)
        res.json(getHost);
    } catch (err) {
        next(err);
    }
};


exports.getRoomByHost = async (req, res, next) => {
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
        const getHost = await roomService.findRoomForDel(roomId)

        if (userHost.id !== Number(hostId)) {
            throw createError(400, "err")
        }



        console.log({ hostIdFormdata: userHost })
        console.log({ hostIdFormparams: getHost })
        await roomService.delRoom(roomId, hostId)
        res.json({ getHost })


    } catch (err) {
        next(err)
    }
}

exports.editRoom = async (req, res, next) => {
    try {
        const { roomId, hostId } = req.params;
        const {
            roomName,
            description,
            maximumAnimal,
            pricePerNight,
            typeRoom
        } = req.body;


        const data = {
            where: {
                id: Number(roomId),
                hostId: Number(hostId)
            },
            data: {
                roomName,
                description,
                maximumAnimal: parseInt(maximumAnimal), // Parse maximumAnimal to integer
                pricePerNight: parseFloat(pricePerNight), // Parse pricePerNight to float
                typeRoom,
            }
        };

        const updatedRoom = await roomService.updateRoom(data.where, data.data);

        // Send the response only once
        res.status(200).json(updatedRoom);
    } catch (err) {
        // Pass the error to the error handler middleware
        next(err);
    }
};

exports.getRoomByHostForUser = async (req, res, next) => {
    try {
        const { hostId } = req.params;
        const room = await roomService.getRoomByHostForUser(Number(hostId));
        res.status(200).json(room);
    } catch (err) {
        next(err);
    }
}
