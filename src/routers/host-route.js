const express = require("express")
const hostController = require("../controllers/host-controller")
const authenticate = require("../middlewares/authenticate")
const upload = require("../middlewares/upload")
const router = express.Router()

router.get("/",authenticate,hostController.getAllHost)
router.post("/create",authenticate,upload.array('photos', 5),hostController.createHost) //รออัพเดตตารางเพื่องเก็บรูปแบบarray
router.get("/host/:userId",authenticate,hostController.getHostUser)
router.put("/host/update",authenticate,upload.array('photos', 5),hostController.putHost)
router.delete("/:hostId/delete",authenticate,hostController.delHost)
router.put("/publish/:bool",authenticate,hostController.setPublish)

module.exports = router;


///ต้องแก้