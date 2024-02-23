const prisma = require("../config/pirsma");

exports.createBooking = ({ checkInDate, checkOutDate, totalPrice, bookingDatetime, user, host, room }) => {
    return prisma.booking.create({
        data: {
            checkInDate,
            checkOutDate,
            totalPrice,
            bookingDatetime,
            user,
            host,
            room,
        },
    });
};

exports.createBookingHistory = ({ checkInDate, checkOutDate, totalPrice, bookingDatetime, booking }) => {
    return prisma.bookings_history.create({
        data: {
            checkInDate,
            checkOutDate,
            totalPrice,
            bookingDatetime,
            booking,
        },
    });
};

exports.statusBooking = ({ bookingStatus, booking, bookings_history }) => {
    return prisma.status_booking.create({
        data: {
            bookingStatus,
            booking,
            bookings_history,
        },
    });
};


exports.petCountBooking = ({ petId, bookingId }) => {
    return prisma.pet_count_booking.create({
        data: {
            petId,
            bookingId,
        },
    });
};


exports.getBookings = ({ userId, host, room, pets_count_booking, booking_history, status_booking }) => {
    return prisma.booking.findMany({
        where: {
            userId,
        },
        include: {
            host,
            room,
            pets_count_booking,
            booking_history,
            status_booking,
        },
    })
}

exports.getHostByUserId = (userId) => {
    return prisma.host.findMany({
      where: {
        userId,
      },
      include: {
        Bookings: {
          include: {
            pets_count_booking: {
                include: {
                    pet: true
                }
            },
            booking_history: true,
            status_booking: true,
            room: true,
            user: true,
          },
        },
      },
    });
  };


  exports.updateStatus =({id,text}) =>{
    return prisma.status_booking.update({
        where:{
            id:parseInt(id),
        },
        data:{
            bookingStatus: text,
        }

    })
  }

  exports.checkOut =({idBH,Timestamp})=>{
    return prisma.bookings_history.update({
        where:{
            id: parseInt(idBH),
        },
        data:{
            checkOutDatetime: new Date(),
        }
    })
  }

