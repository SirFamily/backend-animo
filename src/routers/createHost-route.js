const express = require("express")
const hostController = require("../controllers/createHost-controller")
const router = express.Router()

router.post("/create",hostController.createHome)
router.get("/",hostController.getAllHome)
router.get("/:host_id",hostController.getHome)
router.put("/:host_id/update",hostController.updateHome)
router.delete("/:host_id/delete",hostController.deleteHome)

module.exports = router;