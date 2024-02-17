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
        },
        include: {
            rooms_img: true
        }
    });
};


exports.findRoomForDel = (roomId,hostId)=>{
    return prisma.room.findFirst({
        where:{
            id:Number(roomId),
        }
    })
}

exports.getHostByIdUser = (userId) => {
    return prisma.host.findFirst({
        where:{
            userId:userId,
        }
    })
}

exports.delRoom = (roomId,hostId) =>{
    return prisma.room.delete({
        where:{
            id:Number(roomId),
            hostId:Number(hostId)
        }
    })
}

exports.addRoom = (data)=>{
    return  prisma.room.create({
        data:data,
    })
}

exports.uploadImgRoom = ({images, roomId} ) => {

    const imageData = images.map((image) => {
        return {
            urlImg: image.urlImg,
            roomId: roomId,
        };
    });

    return prisma.room_img.createMany({
        data: imageData,
    });
};

exports.getRoomByHost = (id)=>{
    return prisma.room.findMany({
        where:{
            id:id,
        }
    })
}