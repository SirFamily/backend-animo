const express = require("express")
const createpetController = require("../controllers/createPet-controller")
const authenticate = require("../middlewares/authenticate")
const router = express.Router()

const upload = require("../middlewares/upload")

router.post("/pet",authenticate,upload.single("avatar"),createpetController.addPet)
// router.put("/pet/update",authenticate,upload.single("avatar"),createpetController.)

module.exports = router