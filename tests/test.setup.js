// tests\test.setup.js

const { expect } = require('chai');
const { BOOKING_ENDPOINT, TIMEOUT } = require('../setup');
const { del } = require('../helpers/requestHelpers');
const { getAuthToken } = require('../helpers/authHelpers');

global.bookingsIdsToDelete = [];

before(async function () {
  global.authToken = await getAuthToken();
});

after(async function () {
  const totalTimeout = TIMEOUT * global.bookingsIdsToDelete.length;
  this.timeout(totalTimeout);

  for (const bookingId of global.bookingsIdsToDelete) {
    const response = await del(BOOKING_ENDPOINT, bookingId, global.authToken);
    expect(response.status).to.equal(201);
  }
});
