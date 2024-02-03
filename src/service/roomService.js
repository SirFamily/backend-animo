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

exports.addRoom = (data)=>{
    return  prisma.room.create({
        data:data,
    })
}

exports.uploadImgRoom = (data) => {
    return prisma.room_img.createMany({
        data: data.images.map((image) => ({
            image: image.image,
            roomId: image.roomId,
        })),
    });
};

exports.getRoomByHost = (id)=>{
    return prisma.room.findMany({
        where:{
            id:id,
        }
    })
}