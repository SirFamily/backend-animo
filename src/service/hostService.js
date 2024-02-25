const prisma = require("../config/pirsma");


exports.gerHostAll = (userId) => {
    return prisma.host.findMany({
        where: {
            userId: { not: userId } ,
            publish: true
        },
        include: {
            Host_img: true, 
        },
    });
}
exports.addHost = (hostData) => {
    return prisma.host.create({
        data: hostData,
    })
}

exports.getHostByIdUser = (userId) => {
    return prisma.host.findFirst({
        where: {
            userId: userId,
        },
        include: {
            Host_img: true, 
        },
    });
}


exports.updateHost = (id, data) => {
    return prisma.host.update({
        where: {
            id: id
        },
        data: data
    })
}

exports.delHost = (id) => {
    return prisma.host.delete({
        where: {
            id: id,
        }
    });
}

exports.uploadImgHost = ({images, hostId} ) => {

    const imageData = images.map((image) => {
        return {
            imgUrl: image.urlImg,
            hostId,
        };
    });
    return prisma.host_img.createMany({
        data: imageData,
    });
}

