// tests\create.spec.js

const { expect } = require('chai');
const { BOOKING_ENDPOINT } = require('../setup');
const { get } = require('../helpers/requestHelpers');
const { getNewBookingId } = require('../helpers/bookingHelpers');
const { generateBookingData } = require('../test-data/bookingData');

describe('Create Booking', function () {
  it('TC 2.1 - Create Booking', async function () {
    const bookingData = generateBookingData();

    const newBookingId = await getNewBookingId(bookingData);
    global.bookingsIdsToDelete.push(newBookingId);

    expect(newBookingId).to.be.a('number');

    const response = await get(BOOKING_ENDPOINT, newBookingId);
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(bookingData);
  });
});
