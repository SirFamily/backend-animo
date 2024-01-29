const express = require("express")
const hostController = require("../controllers/createHost-controller")
const router = express.Router()

router.post("/create",hostController.createHome)
router.get("/",hostController.getAllHome)
router.get("/:host_id",hostController.getHome)
router.put("/update/:host_id",hostController.updateHome)
router.delete("/delete/:host_id",hostController.deleteHome)

module.exports = router;