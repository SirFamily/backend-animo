const express = require("express")
const authenticate = require("../middlewares/authenticate")
const bookingController = require("../controllers/booking-controller")
const router = express.Router()


router.post("/:hostId/:roomId", authenticate, bookingController.createBooking)
router.get("/bookings/", authenticate, bookingController.getBookings)
router.get("/request/",authenticate,bookingController.getRequests)
router.put("/accept/:id",bookingController.upStateConfirm)
router.put("/reject/:id",bookingController.upStateCancel)
router.put("/Complete/:id/:idBH",bookingController.upStateComplete)

//router.delete('/remove/:id', authenticate, bookingController.removeBooking)

module.exports = router
