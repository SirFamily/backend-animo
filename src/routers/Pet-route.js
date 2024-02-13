const express = require("express")
const createpetController = require("../controllers/pet-controller")
const authenticate = require("../middlewares/authenticate")
const router = express.Router()

const upload = require("../middlewares/upload")

router.post("/:userId",authenticate,upload.single("avatar"),createpetController.addPet)
router.get("/pet/:userId",authenticate ,createpetController.viewPet)
router.put("/pet/:userId/update/:petId",authenticate,upload.single("avatar"),createpetController.putPet)
router.delete('/pet/:id/remove', authenticate ,createpetController.delPet)

module.exports = router