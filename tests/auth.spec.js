// tests\authentication.spec.js

const { expect } = require('chai');
const { AUTH_ENDPOINT } = require('../setup');
const { post } = require('../helpers/requestHelpers');
const { validCredentials, invalidCredentials } = require('../test-data/authData');

describe('Authentication', function () {
  it('TC 1.1 - Valid Authentication', async function () {
    const response = await post(AUTH_ENDPOINT, validCredentials);
    expect(response.status).to.equal(200);
    expect(response.body.token).to.be.a('string');
  });

  invalidCredentials.forEach(({ description, username, password }) => {
    it(`TC 1.2 - Invalid ${description} Authentication`, async function () {
      const response = await post(AUTH_ENDPOINT, { username: username, password: password });
      expect(response.status).to.equal(200);
      expect(response.body.reason).to.equal('Bad credentials');
    });
  });
});
