const createError = require("../utils/createError");
const prisma = require("../config/pirsma");
const bookingService = require("../service/bookingService")
exports.createBooking =  async (req, res, next) => {
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
    res.json("booking created");
  } catch (err) {
    next(err);
  }
};


exports.getBookings = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Fetch all bookings for the given user
    const userBookings = await prisma.booking.findMany({
      where: {
        userId: userId,
      },
      include: {
        host: true,
        room: true,
        pets_count_booking: true,
        booking_history: true,
        status_booking: true,
      },
    });

    // Handle the case when there are no bookings for the user
    if (!userBookings || userBookings.length === 0) {
      return res.json([]);
    }

    // Return the bookings
    res.json(userBookings);
  } catch (err) {
    next(err);
  }
};
