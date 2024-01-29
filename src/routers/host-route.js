const express = require("express")
const hostController = require("../controllers/host-controller")
const router = express.Router()

router.post("/homes",hostController.homes)
router.post("/")

module.exports = router;