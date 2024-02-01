const prisma = require("../config/pirsma");

exports.getPetByID = (id) => {
    return prisma.pet.findUnique({
        where: {
            id: id
        }
    })
}

exports.addPet = async (petData) => {
    return prisma.pet.create({
        data: petData,
    });
};

