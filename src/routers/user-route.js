const express = require("express")
const userController = require("../controllers/user-controller")
const router = express.Router()

router.get("/user/:user_id",userController.getUser)
router.put("/user/:user_id/setting", userController.userPut)


module.exports = router;
