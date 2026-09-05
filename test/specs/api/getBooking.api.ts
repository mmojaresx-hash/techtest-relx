import { expect } from 'chai';

import { apiConfig } from '../../config/api.config';
import { bookingData } from '../../data/booking.data';

import { Booking, BookingResponse } from '../../types/booking.types';

import { post, get } from '../../helpers/api.helper';

describe('Restful Booker - GetBooking API', () => {
    let bookingId: number;

    before(async () => {
        const response = await post<BookingResponse>(
            `${apiConfig.baseUrl}${apiConfig.endpoints.booking}`,
            bookingData.createBooking,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'User-Agent':
                        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/140.0.0.0 Safari/537.36',
                },
            },
        );

        bookingId = response.data.bookingid;
    });

    it('should retrieve booking successfully', async () => {
        const response = await get<Booking>(
            `${apiConfig.baseUrl}${apiConfig.endpoints.booking}/${bookingId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'User-Agent':
                        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/140.0.0.0 Safari/537.36',
                },
            },
        );

        // Status
        expect(response.status).to.equal(200);

        // firstname
        expect(response.data.firstname).to.equal(
            bookingData.createBooking.firstname,
        );

        // lastname
        expect(response.data.lastname).to.equal(
            bookingData.createBooking.lastname,
        );

        // totalprice
        expect(response.data.totalprice).to.equal(
            bookingData.createBooking.totalprice,
        );

        // depositpaid
        expect(response.data.depositpaid).to.equal(
            bookingData.createBooking.depositpaid,
        );

        // booking dates
        expect(response.data.bookingdates.checkin).to.equal(
            bookingData.createBooking.bookingdates.checkin,
        );

        expect(response.data.bookingdates.checkout).to.equal(
            bookingData.createBooking.bookingdates.checkout,
        );

        // additional needs
        expect(response.data.additionalneeds).to.equal(
            bookingData.createBooking.additionalneeds,
        );
    });

    it('should return error for invalid booking ID', async () => {
        const response = await get<Booking>(
            `${apiConfig.baseUrl}${apiConfig.endpoints.booking}/999999999`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'User-Agent':
                        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/140.0.0.0 Safari/537.36',
                },
            },
        );

        expect(response.status).to.be.oneOf([404, 405]);
    });
});
