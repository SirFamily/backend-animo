const express = require("express")
const hostController = require("../controllers/host-controller")
const router = express.Router()

router.post("/host",hostController.createHomes)

module.exports = router;