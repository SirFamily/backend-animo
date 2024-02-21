const createError = require("../utils/createError");
const prisma = require("../config/pirsma");
const bookingService = require("../service/bookingService")
exports.createBooking = async (req, res, next) => {
  try {
    const { checkInDate, checkOutDate, totalPrice, selectedTags } = req.body;
    const { hostId, roomId } = req.params;
    const userId = req.user.id;

    const booking = await bookingService.createBooking({
        checkInDate: new Date(checkInDate),
        checkOutDate: new Date(checkOutDate),
        totalPrice: totalPrice,
        bookingDatetime: new Date(),
        user: { connect: { id: userId } },
        host: { connect: { id: parseInt(hostId) } },
        room: { connect: { id: parseInt(roomId) } },

    });

    const bookingHistory = await bookingService.createBookingHistory({
        checkInDate: new Date(checkInDate),
        checkOutDate: new Date(checkOutDate),
        totalPrice: totalPrice,
        bookingDatetime: new Date(),
        booking: { connect: { id: booking.id } },
    });

    const status = await bookingService.statusBooking({
        bookingStatus: 'PENDING',
        booking: { connect: { id: booking.id } },
        bookings_history: { connect: { id: bookingHistory.id } },
    });

    for (const tag of selectedTags) {
      await bookingService.petCountBooking({
          petId: parseInt(tag.value),
          bookingId: booking.id,
      });
    }

    console.log(req.body, req.params);
    res.json(booking);
  } catch (err) {
    next(err);
  }
};
