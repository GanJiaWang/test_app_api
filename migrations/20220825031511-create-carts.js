'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('carts', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      productId: {
        field: 'product_id',
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id'
        },
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
    }),

  down: queryInterface => queryInterface.dropTable('carts')
};
