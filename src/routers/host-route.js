const express = require("express")
const hostController = require("../controllers/createHost-controller")
const router = express.Router()

router.post("/host",hostController.createHomes)

module.exports = router;