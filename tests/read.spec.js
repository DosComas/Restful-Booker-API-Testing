// tests/read.spec.ts

const { expect } = require('chai');
const { BOOKING_ENDPOINT } = require('../setup');
const { get } = require('../helpers/requestHelpers');
const { getNewBookingId } = require('../helpers/bookingHelpers');
const { generateBookingData, nonExistentId } = require('../test-data/bookingData');

describe('Read Booking', function () {
  it('TC 2.2 - Retrieve Booking Details', async function () {
    const bookingData = generateBookingData();

    const newBookingId = await getNewBookingId(bookingData);
    global.bookingsIdsToDelete.push(newBookingId);

    const response = await get(BOOKING_ENDPOINT, newBookingId);
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(bookingData);
  });

  it('TC 2.3 - Invalid Booking Retrieval', async function () {
    const response = await get(BOOKING_ENDPOINT, nonExistentId);
    expect(response.status).to.equal(404);
    expect(response.text).to.equal('Not Found');
  });
});
