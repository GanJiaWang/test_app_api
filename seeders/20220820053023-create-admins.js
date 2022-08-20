'use strict';

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('admins', [{
    name: 'Master Admins',
    email: 'masteradmin@example.com',
    password: '1234',
    role: 1,
  }]),
  down: (queryInterface) => queryInterface.bulkDelete('admins', null, {})
};