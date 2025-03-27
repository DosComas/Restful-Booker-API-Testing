// tests\delete.spec.js

const { expect } = require('chai');
const { BOOKING_ENDPOINT } = require('../setup');
const { get, del } = require('../helpers/requestHelpers');
const { getNewBookingId } = require('../helpers/bookingHelpers');
const { generateBookingData } = require('../test-data/bookingData');
const { invalidTokens } = require('../test-data/authData');

describe('Delete Booking', function () {
  it('TC 4.1 - Delete Booking', async function () {
    const bookingData = generateBookingData();

    const newBookingId = await getNewBookingId(bookingData);

    const delResponse = await del(BOOKING_ENDPOINT, newBookingId, global.authToken);
    expect(delResponse.status).to.equal(201);
    expect(delResponse.text).to.equal('Created');

    const getResponse = await get(BOOKING_ENDPOINT, newBookingId);
    expect(getResponse.status).to.equal(404);
    expect(getResponse.text).to.equal('Not Found');
  });

  invalidTokens.forEach(({ description, token }) => {
    it(`TC 4.2 - Unauthorized ${description} Deletion`, async function () {
      const bookingData = generateBookingData();

      const newBookingId = await getNewBookingId(bookingData);
      global.bookingsIdsToDelete.push(newBookingId);

      const response = await del(BOOKING_ENDPOINT, newBookingId, token);
      expect(response.status).to.equal(403);
      expect(response.text).to.equal('Forbidden');
    });
  });
});
