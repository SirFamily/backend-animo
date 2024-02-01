const createError = require("../utils/createError")
const hostService = require("../service/hostService")

//สร้างhostแชร์บ้านและ
exports.createHome = async (req, res, next) => {
    try {
        const { hostName, location, description, propertyType } = req.body

        if(!hostName||!location||!propertyType){
            throw createError(400,'Missing required fields')
        }

        hostUserId = req.user.id
        await hostService.addHost(
            {hostName,
            location,
            description,
            propertyType,
            hostUserId}
        )
        
        res.json(req.body)
    } catch (err) {
        next(err)
    }
}

//gethost
exports.getAllHome = async (req, res, next) => {
    res.json({ message: "getALLhost" })
}

exports.getHome = async (req, res, next) => {
    const { host_id } = req.params
    res.json({ host_id })
}

//แก้ไขข้อมูล
exports.updateHome = (req, res, next) => {
    const { host_id } = req.params
    res.json({ message: "update host " + host_id })
}
//ลบข้อมูล
exports.deleteHome = (req, res, next) => {
    const { host_id } = req.params;
    res.json({ message: "Delete host " + host_id });

}
