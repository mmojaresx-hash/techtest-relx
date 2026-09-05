import { expect } from 'chai';

import { apiConfig } from '../../config/api.config';
import { bookingData } from '../../data/booking.data';

import { BookingResponse, Booking } from '../../types/booking.types';

import { post, get, remove } from '../../helpers/api.helper';

import { getAuthToken } from '../../helpers/auth.helper';

describe('Restful Booker - DeleteBooking API', () => {
    let bookingId: number;
    let token: string;

    before(async () => {
        // Authenticate
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

    it('should delete an existing booking', async () => {
        const response = await remove(
            `${apiConfig.baseUrl}${apiConfig.endpoints.booking}/${bookingId}`,

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

        // Delete status
        expect(response.status).to.be.oneOf([200, 201]);

        // Verify booking was deleted
        const getResponse = await get<Booking>(
            `${apiConfig.baseUrl}${apiConfig.endpoints.booking}/${bookingId}`,
        );

        expect(getResponse.status).to.be.oneOf([404, 405]);
    });

    it('should return error for invalid booking ID', async () => {
        const response = await remove(
            `${apiConfig.baseUrl}${apiConfig.endpoints.booking}/999999999`,

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
