'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      phone: {
        allowNull: true,
        type: Sequelize.STRING
      },
      ext: {
        allowNull: true,
        type: Sequelize.STRING
      },
      extPassword: {
        allowNull: true,
        type: Sequelize.STRING
      },
      email: {
        allowNull: true,
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      departmentId: {
        allowNull: false,
        type: Sequelize.INTEGER(10).UNSIGNED,
      },
      avatarId: {
        allowNull: true,
        type: Sequelize.INTEGER(10).UNSIGNED,
      },
      position: {
        type: Sequelize.ENUM('sale_leader', 'telesales', 'sale_manager', 'sale_admin', 'admin'),
        defaultValue: 'telesales',
      },
      roleId: {
        allowNull: false,
        type: Sequelize.INTEGER(10).UNSIGNED,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdBy: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: true,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedBy: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: true,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
