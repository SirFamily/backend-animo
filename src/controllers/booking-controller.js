const createError = require("../utils/createError");
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
    res.json("booking created");
  } catch (err) {
    next(err);
  }
};


exports.getBookings = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const userBookings = await bookingService.getBookings({
      userId: userId,
      host: true,
      room: true,
      pets_count_booking: true,
      booking_history: true,
      status_booking: true,
    });

    if (!userBookings || userBookings.length === 0) {
      return res.json([]);
    }

    res.json(userBookings);
  } catch (err) {
    next(err);
  }
};

exports.getRequests =  async (req, res, next) => {
  try{
    userId = req.user.id;
    const host = await bookingService.getHostByUserId(userId);

  res.json(host);
  }catch(err){
    next(err)
  }
}

exports.upStateConfirm = async (req,res,next)=>{
  try{

    const { id } = req.params;
    const text = "CONFIRMED"
    await  bookingService.updateStatus({text, id});

res.json("สำเร็จ")

  }catch(err){
    next(err)
  }
}


exports.upStateCancel = async (req,res,next)=>{
  try{
    const { id } = req.params;
    const text = "CANCELLED"
    await  bookingService.updateStatus({text, id});

    res.json("สำเร็จ")
  }catch(err){
    next(err)
  }
}

exports.upStateComplete = async (req,res,next)=>{
  try{
    const { id,idBH} = req.params;
    const text = "COMPLETED"
    await  bookingService.updateStatus({text, id});
    const Timestamp = new Date();
    await bookingService.checkOut({idBH,Timestamp})

    res.json("สำเร็จ")
  }catch(err){
    next(err)
  }
}