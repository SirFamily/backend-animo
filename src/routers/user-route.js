const express = require("express")
const userController = require("../controllers/user-controller")
const authenticate = require("../middlewares/authenticate")
const upload = require("../middlewares/upload")

const router = express.Router()

router.get("/user",authenticate,userController.getUser)
router.put("/user/update",authenticate,upload.single("avatar"), userController.userPut)


module.exports = router;
