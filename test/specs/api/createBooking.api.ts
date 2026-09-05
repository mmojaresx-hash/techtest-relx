import { expect } from 'chai';
import { apiConfig } from '../../config/api.config';
import { bookingData } from '../../data/booking.data';
import { BookingResponse } from '../../types/booking.types';
import { post } from '../../helpers/api.helper';

describe('Restful Booker - CreateBooking API', () => {
	it('should create a booking successfully', async () => {
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

		// Status assertion
		expect(response.status).to.equal(200);

		// bookingid assertions
		expect(response.data).to.have.property('bookingid');
		expect(response.data.bookingid).to.be.a('number');
		expect(response.data.bookingid).to.be.greaterThan(0);

		// firstname
		expect(response.data.booking.firstname).to.equal(
			bookingData.createBooking.firstname,
		);
		// lastname
		expect(response.data.booking.lastname).to.equal(
			bookingData.createBooking.lastname,
		);
		// totalprice
		expect(response.data.booking.totalprice).to.equal(
			bookingData.createBooking.totalprice,
		);
		// depositpaid
		expect(response.data.booking.depositpaid).to.equal(
			bookingData.createBooking.depositpaid,
		);
		// booking dates
		expect(response.data.booking.bookingdates.checkin).to.equal(
			bookingData.createBooking.bookingdates.checkin,
		);
		expect(response.data.booking.bookingdates.checkout).to.equal(
			bookingData.createBooking.bookingdates.checkout,
		);
		// additional needs
		expect(response.data.booking.additionalneeds).to.equal(
			bookingData.createBooking.additionalneeds,
		);
	});
});
