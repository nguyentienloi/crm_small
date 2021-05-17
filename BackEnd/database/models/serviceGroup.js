'use strict';
module.exports = (sequelize, DataTypes) => {
  const ServiceGroup = sequelize.define('ServiceGroup', {
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
    description: {
      allowNull: true,
      type: DataTypes.STRING,
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
    tableName: 'service_groups'
  });
  ServiceGroup.associate = function(models) {
    // associations can be defined here
    ServiceGroup.hasMany(models.Service, {
      as: 'services',
      foreignKey: 'groupId',
      sourceKey: 'id',
    });
  };
  return ServiceGroup;
};
