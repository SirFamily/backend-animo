const express = require("express")
const hostController = require("../controllers/host-controller")
const authenticate = require("../middlewares/authenticate")
const upload = require("../middlewares/upload")
const router = express.Router()

router.get("/",authenticate,hostController.getAllHost)
router.post("/create",authenticate,upload.single("avatar"),hostController.createHost) //รออัพเดตตารางเพื่องเก็บรูปแบบarray
router.get("/host/:userId",authenticate,hostController.getHostUser)
router.put("/host/update",authenticate,upload.single("avatar"),hostController.putHost)
router.delete("/:hostId/delete",authenticate,hostController.delHost)

module.exports = router;


///ต้องแก้