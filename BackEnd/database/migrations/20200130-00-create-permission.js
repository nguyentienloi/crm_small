'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      model: {
        allowNull: false,
        type: Sequelize.ENUM('user', 'service', 'service_combo', 'service_group',
            'order', 'contact', 'department', 'role', 'call_center', 'schedule', 'kpi',
        ),
      },
      action: {
        allowNull: false,
        type: Sequelize.ENUM('read', 'create', 'update', 'delete', 'approve', 'reset_password', 'view_all'),
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
    return queryInterface.dropTable('permissions');
  }
};
