const prisma = require("../config/pirsma");

exports.getPetById = (userId) => {
    return prisma.pet.findMany({
        where: userId,
    });
};


exports.addPet = async (petData) => {
    return prisma.pet.create({
        data: petData,
    });
};

exports.putPetByIdAndPetId = ({ where, data }) => {
    return prisma.pet.update({
        where: {
            id: where.id,
        },
        data: data,
    });
}

exports.deletePet = (id) => {
    return prisma.pet.delete({
        where: {
            id,
        }
    });
}
