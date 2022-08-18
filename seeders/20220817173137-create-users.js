'use strict';

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Users', [{
    name: 'test',
    email: 'test@example.com',
    password: '1234',
  }]),
  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {})
};