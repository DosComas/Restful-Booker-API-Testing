// tests\update.spec.js

const { expect } = require('chai');
const { BOOKING_ENDPOINT } = require('../setup');
const { get, put, patch } = require('../helpers/requestHelpers');
const { getNewBookingId } = require('../helpers/bookingHelpers');
const { generateBookingData, bookingDataKeys } = require('../test-data/bookingData');
const { invalidTokens } = require('../test-data/authData');

describe('Update Booking', function () {
  it('TC 3.1 - Update Booking', async function () {
    const bookingData = generateBookingData();
    const updatedBookingData = generateBookingData();

    const newBookingId = await getNewBookingId(bookingData);
    global.bookingsIdsToDelete.push(newBookingId);

    const response = await put(
      BOOKING_ENDPOINT,
      newBookingId,
      updatedBookingData,
      global.authToken
    );
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(updatedBookingData);
  });

  invalidTokens.forEach(({ description, token }) => {
    it(`TC 3.2 - Unauthorized ${description} Update`, async function () {
      const bookingData = generateBookingData();
      const updatedBookingData = generateBookingData();

      const newBookingId = await getNewBookingId(bookingData);
      global.bookingsIdsToDelete.push(newBookingId);

      const response = await put(BOOKING_ENDPOINT, newBookingId, updatedBookingData, token);
      expect(response.status).to.equal(403);
      expect(response.text).to.equal('Forbidden');
    });
  });

  bookingDataKeys.forEach((field) => {
    it(`TC 5.1 - Partial Update ${field}`, async function () {
      const bookingData = generateBookingData();
      const updatedBookingData = generateBookingData();

      const newBookingId = await getNewBookingId(bookingData);
      global.bookingsIdsToDelete.push(newBookingId);

      const patchData = { [field]: updatedBookingData[field] };
      const patchResponse = await patch(
        BOOKING_ENDPOINT,
        newBookingId,
        patchData,
        global.authToken
      );
      expect(patchResponse.status).to.equal(200);

      bookingData[field] = updatedBookingData[field];
      const getResponse = await get(BOOKING_ENDPOINT, newBookingId);
      expect(getResponse.status).to.equal(200);
      expect(getResponse.body).to.deep.equal(bookingData);
    });
  });
});
