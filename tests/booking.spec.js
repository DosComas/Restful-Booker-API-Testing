//tests\booking.spec.js

const { expect } = require('chai');
const { BOOKING_ENDPOINT, TIMEOUT } = require('../setup');
const { get, put, del, patch } = require('../helpers/requestHelpers');
const { getNewBookingId } = require('../helpers/bookingHelpers');
const { generateBookingData, nonExistentId, bookingDataKeys } = require('../test-data/bookingData');
const { getAuthToken } = require('../helpers/authHelpers');
const { invalidTokens } = require('../test-data/authData');

let authToken;
before(async function () {
  authToken = await getAuthToken();
});

let bookingsIdsToDelete = [];
after(async function () {
  const totalTimeout = TIMEOUT * bookingsIdsToDelete.length;
  this.timeout(totalTimeout);

  for (const bookingId of bookingsIdsToDelete) {
    const response = await del(BOOKING_ENDPOINT, bookingId, authToken);
    expect(response.status).to.equal(201);
  }
});

describe('Create Booking', function () {
  it('TC 2.1 - Create Booking', async function () {
    const bookingData = generateBookingData();

    const newBookingId = await getNewBookingId(bookingData);
    bookingsIdsToDelete.push(newBookingId);

    expect(newBookingId).to.be.a('number');

    const response = await get(BOOKING_ENDPOINT, newBookingId);
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(bookingData);
  });
});

describe('Read Booking', function () {
  it('TC 2.2 - Retrieve Booking Details', async function () {
    const bookingData = generateBookingData();

    const newBookingId = await getNewBookingId(bookingData);
    bookingsIdsToDelete.push(newBookingId);

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

describe('Update Booking', function () {
  it('TC 3.1 - Update Booking', async function () {
    const bookingData = generateBookingData();
    const updatedBookingData = generateBookingData();

    const newBookingId = await getNewBookingId(bookingData);
    bookingsIdsToDelete.push(newBookingId);

    const response = await put(BOOKING_ENDPOINT, newBookingId, updatedBookingData, authToken);
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(updatedBookingData);
  });

  invalidTokens.forEach(({ description, token }) => {
    it(`TC 3.2 - Unauthorized ${description} Update`, async function () {
      const bookingData = generateBookingData();
      const updatedBookingData = generateBookingData();

      const newBookingId = await getNewBookingId(bookingData);
      bookingsIdsToDelete.push(newBookingId);

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
      bookingsIdsToDelete.push(newBookingId);

      const patchData = { [field]: updatedBookingData[field] };
      const patchResponse = await patch(BOOKING_ENDPOINT, newBookingId, patchData, authToken);
      expect(patchResponse.status).to.equal(200);

      bookingData[field] = updatedBookingData[field];
      const getResponse = await get(BOOKING_ENDPOINT, newBookingId);
      expect(getResponse.status).to.equal(200);
      expect(getResponse.body).to.deep.equal(bookingData);
    });
  });
});

describe('Delete Booking', function () {
  it('TC 4.1 - Delete Booking', async function () {
    const bookingData = generateBookingData();

    const newBookingId = await getNewBookingId(bookingData);

    const delResponse = await del(BOOKING_ENDPOINT, newBookingId, authToken);
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
      bookingsIdsToDelete.push(newBookingId);

      const response = await del(BOOKING_ENDPOINT, newBookingId, token);
      expect(response.status).to.equal(403);
      expect(response.text).to.equal('Forbidden');
    });
  });
});
