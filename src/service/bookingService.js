const prisma = require("../config/pirsma");

exports.createBooking = ({ checkInDate, checkOutDate, totalPrice, bookingDatetime,user,host,room }) => {
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

exports.createBookingHistory = ({checkInDate,checkOutDate,totalPrice,bookingDatetime,booking}) => {
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

exports.statusBooking = ({bookingStatus,booking,bookings_history}) => {
    return prisma.status_booking.create({
        data: {
            bookingStatus,
            booking,
            bookings_history,
        },
    });
};

exports.petCountBooking = ({petId,bookingId}) => {
    return prisma.pet_count_booking.create({
        data: {
            petId,
            bookingId,
        },
    });
};
