// setup.js

const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  // Base URL
  API_BASE_URL: 'https://restful-booker.herokuapp.com',

  // Valid user
  USERNAME: process.env.VALID_USER,
  PASSWORD: process.env.VALID_PASS,

  // Endpoints
  AUTH_ENDPOINT: '/auth',
  BOOKING_ENDPOINT: '/booking',

  // Timeout
  TIMEOUT: 7000,
};
