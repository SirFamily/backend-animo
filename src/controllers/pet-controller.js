const createError = require("../utils/createError");
const petService = require("../service/petService");
const cloudUpload = require("../utils/cloudUpload");
const prisma = require("../config/pirsma");

exports.addPet = async (req, res, next) => {
    try {
        const { userId } = req.params
        const {
            petName,
            petType,
            birthDate,
            weight,
            height,
            color,
            gender,
            healthStatus,
        } = req.body;



        console.log(userId);
        console.log(petName);

        let url = '';
        if (req.file) {
            url = await cloudUpload(req.file.path);
        }

        if (!petName || !userId) {
            throw createError(400, "Pet name and user ID are required");
        }

        await petService.addPet({
            petName,
            petType: petType !== "null" ? petType : null,
            birthDate: birthDate !== "null" ? new Date(birthDate) : null,
            weight: weight !== "null" ? parseFloat(weight) : null,
            height: height !== "null" ? parseFloat(height) : null,
            color: color !== "null" ? color : null,
            gender: gender !== "null" ? gender : null,
            healthStatus: healthStatus !== "null" ? healthStatus : null,
            urlImgPet: url,
            userId,
        });

        res.status(200).json(req.body);
    } catch (err) {
        next(err);
    }
};

exports.viewPet = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const data = await petService.getPetById({ userId })
        console.log(data)
        res.json(data);
    } catch (err) {
        next(err)
    }
}


exports.putPet = async (req, res, next) => {
    try {
        const { userId,petId} = req.params;


        const {
            petName,
            petType,
            birthDate,
            weight,
            height,
            color,
            gender,
            healthStatus,
            urlImgPet
        } = req.body;

        if (!petId || !userId) {
            throw createError(400, "ID is missing")
        }
        const pet = await petService.getPetById({
            id: Number(petId),
            userId: userId

        });



        console.log(pet)
        if (!pet) return res.status(404).send('The pet does not exist');
        let url = urlImgPet;
        if (req.file) {
            url = await cloudUpload(req.file.path);
        }

        await petService.putPetByIdAndPetId({
            where: {
                id: Number(petId),
            },
            data: {
                petName,
            petType: petType !== "null" ? petType : null,
            birthDate: birthDate !== "null" ? new Date(birthDate) : null,
            weight: weight !== "null" ? parseFloat(weight) : null,
            height: height !== "null" ? parseFloat(height) : null,
            color: color !== "null" ? color : null,
            gender: gender !== "null" ? gender : null,
            healthStatus: healthStatus !== "null" ? healthStatus : null,
            urlImgPet: url,
            userId,
            },
        });


        res.status(200).json(pet);
    } catch (err) {
        next(err);
    }
}

exports.delPet = async (req, res, next) => {
    try {
        const { id } = req.params;
        userId = req.user.id
        const petId = parseInt(id);
        const isOwnerPet = await petService.getPetById({
            id: petId,
            userId: userId
        });

        console.log(isOwnerPet)
        await petService.deletePet(petId)
        res.status(200).json({ message: "pet delete", pet: isOwnerPet });
    } catch (err) {
        next(err);
    }
}
