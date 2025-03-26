// helpers\bookingHelpers.js

const { BOOKING_ENDPOINT } = require('../setup');
const { post } = require('../helpers/requestHelpers');

const getNewBookingId = async (bookingData) => {
  const response = await post(BOOKING_ENDPOINT, bookingData);

  return response.body.bookingid;
};

module.exports = { getNewBookingId };
