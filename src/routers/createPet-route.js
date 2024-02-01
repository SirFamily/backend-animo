const express = require("express")
const createpetController = require("../controllers/pet-controller")
const authenticate = require("../middlewares/authenticate")
const router = express.Router()

const upload = require("../middlewares/upload")

router.post("/pet",authenticate,upload.single("avatar"),createpetController.addPet)
router.put("/pet/:id/update",authenticate,upload.single("avatar"),createpetController.putPet)
// router.delete('/user/:id/remove', authenticate ,createpetController.delPet)

module.exports = router