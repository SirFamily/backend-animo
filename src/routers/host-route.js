const express = require("express")
const hostController = require("../controllers/host-controller")
const authenticate = require("../middlewares/authenticate")
const router = express.Router()

router.post("/create",authenticate,hostController.createHost)
router.get("/",hostController.getAllHost)
router.get("/host",authenticate,hostController.getHostUser)
router.put("/host/update",authenticate,hostController.putHost)
router.delete("/:hostId/delete",authenticate,hostController.delHost)

module.exports = router;


///ต้องแก้