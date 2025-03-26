// test-data\authData.js

const { USERNAME, PASSWORD } = require('../setup');

module.exports = {
  validCredentials: {
    username: USERNAME,
    password: PASSWORD,
  },
  invalidCredentials: [
    { description: 'User Name', username: 'bad_user', password: PASSWORD },
    { description: 'Password', username: USERNAME, password: 'bad_pass' },
  ],
  invalidTokens: [
    { description: 'Invalid Token', token: 'invalid_token' },
    { description: 'Missing Token', token: '' },
  ],
};
