const prisma = require("../config/pirsma");


exports.getHostById = (id) =>{
    return prisma.host.findUnique({
        where: {
            userId:id
        }
    })
}
exports.getRoomAllByToken = (id) => {
    return prisma.room.findMany({
        where: {
            host: id
        }
    });
};