import { Booking } from '../types/booking.types';

export const bookingData: {
    createBooking: Booking;
    updateBooking: Booking;
} = {

    createBooking: {
        firstname: 'John',
        lastname: 'Doe',
        totalprice: 111,
        depositpaid: true,

        bookingdates: {
            checkin: '2018-01-01',
            checkout: '2019-01-01'
        },

        additionalneeds: 'Breakfast'
    },

    updateBooking: {
        firstname: 'Bubba',
        lastname: 'Dude',
        totalprice: 2500,
        depositpaid: false,

        bookingdates: {
            checkin: '2026-11-01',
            checkout: '2026-11-15'
        },

        additionalneeds: 'Lunch'
    }
};
