import { expect } from 'chai';

import { apiConfig } from '../../config/api.config';
import { bookingData } from '../../data/booking.data';
import { Booking, BookingResponse } from '../../types/booking.types';

import { post, put } from '../../helpers/api.helper';
import { getAuthToken } from '../../helpers/auth.helper';

describe('Restful Booker - UpdateBooking API', () => {
    let bookingId: number;
    let token: string;

    before(async () => {
        // Get authentication token
        token = await getAuthToken();

        // Create booking
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

    it('should update an existing booking', async () => {
        const response = await put<Booking>(
            `${apiConfig.baseUrl}${apiConfig.endpoints.booking}/${bookingId}`,

            bookingData.updateBooking,

            {
                headers: {
                    Cookie: `token=${token}`,
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
            bookingData.updateBooking.firstname,
        );

        // lastname
        expect(response.data.lastname).to.equal(
            bookingData.updateBooking.lastname,
        );

        // totalprice
        expect(response.data.totalprice).to.equal(
            bookingData.updateBooking.totalprice,
        );

        // depositpaid
        expect(response.data.depositpaid).to.equal(
            bookingData.updateBooking.depositpaid,
        );

        // checkin
        expect(response.data.bookingdates.checkin).to.equal(
            bookingData.updateBooking.bookingdates.checkin,
        );

        // checkout
        expect(response.data.bookingdates.checkout).to.equal(
            bookingData.updateBooking.bookingdates.checkout,
        );

        // additional needs
        expect(response.data.additionalneeds).to.equal(
            bookingData.updateBooking.additionalneeds,
        );
    });

    it('should reject update for invalid booking ID', async () => {
        const response = await put(
            `${apiConfig.baseUrl}${apiConfig.endpoints.booking}/999999999`,

            bookingData.updateBooking,

            {
                headers: {
                    Cookie: `token=${token}`,
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
