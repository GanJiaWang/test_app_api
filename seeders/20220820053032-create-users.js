'use strict';

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('users', [{
    name: 'testing',
    email: 'test@example.com',
    password: '1234',
    contactNo: '01234567898',
  }]),
  down: (queryInterface) => queryInterface.bulkDelete('users', null, {})
};