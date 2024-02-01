const express = require("express")
const roomController = require("../controllers/room-controller")
const authenticate = require("../middlewares/authenticate")
const router = express.Router()

router.get("/",authenticate,roomController.gerRoomAllByToken)

module.exports = router