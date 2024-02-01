const createError = require("../utils/createError");
const petService = require("../service/petService");
const prisma = require("../config/pirsma");
const cloudUpload = require("../utils/cloudUpload")

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
        if (!isFinite(weightFloat)) throw createError.badRequest('Weight must be a number')
        const heightFloat = parseFloat(height)
        if (!isFinite(heightFloat)) throw createError.badRequest('Height must be a number')
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
