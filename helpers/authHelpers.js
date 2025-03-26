// helpers/authentication.js

const { AUTH_ENDPOINT } = require('../setup');
const { post } = require('../helpers/requestHelpers');
const { validCredentials } = require('../test-data/authData.js');

async function getAuthToken() {
  const response = await post(AUTH_ENDPOINT, validCredentials);

  return response.body.token;
}

module.exports = { getAuthToken };
