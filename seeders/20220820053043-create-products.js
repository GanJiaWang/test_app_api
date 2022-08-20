'use strict';

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('products', [{
    name: 'Pizza',
    description: 'very delicious! very delicious!',
    category: 'Food',
    price: 30,
  }]),
  down: (queryInterface) => queryInterface.bulkDelete('products', null, {})
};