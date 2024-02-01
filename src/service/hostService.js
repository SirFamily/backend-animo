const prisma = require("../config/pirsma");


exports.gerHostAll = () => {
    return prisma.host.findMany()
}
exports.addHost = (hostData) => {
    return prisma.host.create({
        data: hostData,
    })
}

exports.getHostByIdUser = (userId) => {
    return prisma.host.findFirst({
        where:{
            userId:userId,
        }
    })
}

exports.updateHost = (id ,data)=>{
    return prisma.host.update({
        where :{
            id:id
        },
        data:data
    })
}

exports.delHost = (id) => {
    return prisma.host.delete({
        where: {
            id: id,
        }
    });
}



