const createError = require("../utils/createError")
const hostService = require("../service/hostService")


//สร้างhostแชร์บ้านและ
exports.createHost = async (req, res, next) => {
    try {
        const { hostName, location, description, propertyType } = req.body
        console.log(hostName)
        if (!hostName || !location || !propertyType) {
            throw createError(400, 'Missing required fields')
        }

        userId = req.user.id
        await hostService.addHost(
            {
                hostName,
                location,
                description,
                propertyType,
                userId
            }
        )

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
        const { hostName, description, propertyType } = req.body;
        const userId = req.user.id;
        const userHost = await hostService.getHostByIdUser(userId);

        await hostService.updateHost(userHost.id, {
            hostName,
            description,
            propertyType,
        });

        res.json({ message: "แก้ไขสำเร็จ" });
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
