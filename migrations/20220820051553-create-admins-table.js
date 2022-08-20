'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('admins', {
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
      role: {
        type: Sequelize.TINYINT(1)
      },
    }),

  down: queryInterface => queryInterface.dropTable('admins')
};
