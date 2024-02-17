const express = require("express")
const roomController = require("../controllers/room-controller")
const authenticate = require("../middlewares/authenticate")
const upload = require("../middlewares/upload")
const router = express.Router()

router.post("/:hostId/create", authenticate, upload.array('photos', 5), roomController.addRoom)
router.get("/",authenticate,roomController.gerRoomAllByToken)
router.get("/:id/room",authenticate,roomController.getRoomByHostForUser)
router.put("/update/room/:roomId/host/:hostId",authenticate,roomController.editRoom)
router.delete("/room/:roomId/host/:hostId",authenticate,roomController.delRoomByHost)

module.exports = router