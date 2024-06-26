const createError = require("../utils/createError")
const hostService = require("../service/hostService")
const cloudUpload = require("../utils/cloudUpload")


//สร้างhostแชร์บ้านและ
exports.createHost = async (req, res, next) => {
    try {
        const { hostName, location, description, propertyType,lat,lng } = req.body
        console.log(hostName)
        if (!hostName || !location || !propertyType) {
            throw createError(400, 'Missing required fields')
        }

        const imagexPromiseArray = req.files.map((file) => {
            return cloudUpload(file.path)
        })

        const imgUrlArray = await Promise.all(imagexPromiseArray)

        userId = req.user.id
        const hostdata = await hostService.addHost(
            {
                hostName,
                location,
                description,
                propertyType,
                userId,
                Latitude : parseFloat(lat),
                Longitude:parseFloat(lng),
            }
        )

        const images = imgUrlArray.map((imgUrl) => {
            return {
                urlImg: imgUrl,
            }
        })
        hostId = hostdata.id
        const data = await hostService.uploadImgHost({ images, hostId });

        res.status(200).json(req.body)
    } catch (err) {
        next(err)
    }
}

//gethost
exports.getAllHost = async (req, res, next) => {
    const userId = req.user.id
    console.log(userId)
    host = await hostService.gerHostAll(userId)
    res.json(host)
}

exports.getHostUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const userIdFromRequest = req.user.id;

        if (userIdFromRequest !== userId) {
            throw createError(400, 'Invalid user ID');
        }

        const data = await hostService.getHostByIdUser(userIdFromRequest);

        if (!data) {
            // หากไม่พบข้อมูล ส่ง [] (array ว่าง) หรือส่งข้อมูลที่เหมาะสมตามที่คุณต้องการ
            res.json([]);
            return;
        }

        console.log(data);
        res.json([data]);
    } catch (err) {
        next(err);
    }
};
//แก้ไขข้อมูล
exports.putHost = async (req, res, next) => {
    try {
        const { hostName, description, propertyType, publish } = req.body;
        const userId = req.user.id;
        const userHost = await hostService.getHostByIdUser(userId);
console.log(publish)
        // Convert 'publish' to a boolean
        const isPublished = publish === 'true';
        console.log(isPublished)
        await hostService.updateHost(userHost.id, {
            hostName,
            description,
            propertyType,
            publish: isPublished,
        });

        res.json(req.body);

    } catch (err) {
        next(err)
    }
}
//ลบข้อมูล
exports.delHost = async (req, res, next) => {
    try {
        const { hostId } = req.params
        const userId = req.user.id

        const isHostUser = await hostService.getHostByIdUser(userId)
        console.log(isHostUser)
        if (hostId != isHostUser.id || userId != isHostUser.userId) {
            return res.status(401).send({
                message: 'You are not authorized'
            });
        }

        await hostService.delHost(isHostUser.id)
        res.json({ message: "ลบสำเร็จ" });

    } catch (err) {
        next(err)
    }

}

exports.setPublish = async (req, res, next) => {
    try {
        const { bool } = req.params
        res.json({ bool })
    } catch (err) {
        next(err)
    }
}
