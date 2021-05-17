'use strict';
module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define('Service', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    code: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    unit: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    price: {
      allowNull: false,
      type: DataTypes.INTEGER(10).UNSIGNED,
    },
    groupId: {
      allowNull: false,
      type: DataTypes.INTEGER(10).UNSIGNED,
    },
    createdBy: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true,
    },
    updatedBy: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true,
    },
  }, {
    tableName: 'services'
  });
  Service.associate = function(models) {
    // associations can be defined here
    Service.belongsTo(models.ServiceGroup, {
      as: 'group',
      foreignKey: 'groupId',
      targetKey: 'id',
    });
    Service.belongsToMany(models.Image, {
      as: 'images',
      through: models.ImageItem,
      foreignKey: 'modelId',
      otherKey: 'imageId',

    });
  };
  return Service;
};
