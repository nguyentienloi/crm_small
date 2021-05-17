'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('image_items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(10).UNSIGNED
      },
      imageId: {
        allowNull: false,
        type: Sequelize.INTEGER(10).UNSIGNED
      },
      isThumbnail: {
        allowNull: false,
        default: false,
        type: Sequelize.BOOLEAN
      },
      order: {
        allowNull: true,
        type: Sequelize.INTEGER(10).UNSIGNED
      },
      modelName: {
        allowNull: false,
        type: Sequelize.ENUM('service')
      },
      modelId: {
        allowNull: false,
        type: Sequelize.INTEGER(10).UNSIGNED
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
    return queryInterface.dropTable('image_items');
  }
};
