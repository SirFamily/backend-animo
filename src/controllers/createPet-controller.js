const createError = require("../utils/createError");
const petService = require("../service/petService");
const cloudUpload = require("../utils/cloudUpload");
const prisma = require("../config/pirsma");

exports.addPet = async (req, res, next) => {
    try {
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

        const userId = req.user.id;
        const weightFloat = parseFloat(weight)
        if (!isFinite(weightFloat)) throw createError(400,'Weight must be a number')
        const heightFloat = parseFloat(height)
        if (!isFinite(heightFloat)) throw createError(400,'Height must be a number')
        console.log(userId);
        console.log(petName);
        const url = await cloudUpload(req.file.path);

        if (!petName || !userId) {
            throw createError(400, "Pet name and user ID are required");
        }

        await petService.addPet({
            petName,
            petType,
            birthDate,
            weight: weightFloat,
            height: heightFloat,
            color,
            gender,
            healthStatus,
            img_pet: url,
            userId,
        });

        res.status(201).json(req.body);
    } catch (err) {
        next(err);
    }
};


exports.putPet = async (req, res, next) => {
    try {
        const { id } = req.params;
        

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

        const userId = req.user.id;
        const petId = parseInt(id);
        if(!id||userId){
            throw createError(400,"ID is missing")
        }
        const pet = await petService.getPetById({
            id: petId,
            userId: userId

        });

        console.log(pet)
        if (!pet) return res.status(404).send('The pet does not exist');
        const url = await cloudUpload(req.file.path);

        const weightFloat = parseFloat(weight)
        if (!isFinite(weightFloat)) throw createError.badRequest('Weight must be a number')
        const heightFloat = parseFloat(height)
        if (!isFinite(heightFloat)) throw createError.badRequest('Height must be a number')

        await petService.putPetByIdAndPetId({
            where: {
                id: petId, 
            },
            data: {
                petName,
                petType,
                birthDate,
                weight:weightFloat,
                height:heightFloat,
                color,
                gender,
                healthStatus,
                img_pet:url,
            },
        });
        

        res.status(200).json(pet);
    } catch (err) {
        next(err);
    }
}
