// helpers\bookingData.js

const { faker } = require('@faker-js/faker');

module.exports = {
  bookingDataKeys: [
    'firstname',
    'lastname',
    'totalprice',
    'depositpaid',
    'bookingdates',
    'additionalneeds',
  ],

  generateBookingData: () => ({
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    totalprice: faker.number.int({ min: 50, max: 5000 }),
    depositpaid: faker.datatype.boolean(),
    bookingdates: {
      checkin: faker.date.past().toISOString().split('T')[0],
      checkout: faker.date.future().toISOString().split('T')[0],
    },
    additionalneeds: faker.helpers.arrayElement(['Breakfast', 'Lunch', 'Dinner']),
  }),

  nonExistentId: 999999,
};
