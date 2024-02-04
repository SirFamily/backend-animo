const express = require("express")
const authenticate = require("../middlewares/authenticate")
const bookingController  = require("../controllers/booking-controller")
const router = express.Router()


router.post("/:getHostById/:roomid",authenticate,bookingController.createBooking)

module.exports = router
