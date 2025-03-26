// helpers\requestHelpers.js

const supertest = require('supertest');
const { API_BASE_URL } = require('../setup');

async function get(endpoint, resourceId) {
  const response = supertest(API_BASE_URL)
    .get(`${endpoint}/${resourceId}`)
    .set('Accept', 'application/json');
  return await response;
}

async function post(endpoint, data = {}) {
  const response = supertest(API_BASE_URL)
    .post(endpoint)
    .send(data)
    .set('Accept', 'application/json');
  return await response;
}

async function put(endpoint, resourceId, data = {}, token) {
  const response = supertest(API_BASE_URL)
    .put(`${endpoint}/${resourceId}`)
    .send(data)
    .set('Accept', 'application/json');

  if (token) {
    response.set('Cookie', `token=${token}`);
  }

  return await response;
}

async function patch(endpoint, resourceId, data = {}, token) {
  const response = supertest(API_BASE_URL)
    .patch(`${endpoint}/${resourceId}`)
    .send(data)
    .set('Accept', 'application/json');

  if (token) {
    response.set('Cookie', `token=${token}`);
  }

  return await response;
}

async function del(endpoint, resourceId, token = '') {
  const response = supertest(API_BASE_URL)
    .delete(`${endpoint}/${resourceId}`)
    .set('Accept', 'application/json');

  if (token) {
    response.set('Cookie', `token=${token}`);
  }

  return await response;
}

module.exports = {
  get,
  post,
  put,
  patch,
  del,
};
