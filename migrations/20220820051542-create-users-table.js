'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: true,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: Sequelize.STRING(72),
        allowNull: true
      },
      contactNo: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
    }),

  down: queryInterface => queryInterface.dropTable('users')
};
