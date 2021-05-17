'use strict';
module.exports = (sequelize, DataTypes) => {
  const ServiceGroupSource = sequelize.define('ServiceGroupSource', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    groupId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
    },
    url: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    type: {
      allowNull: false,
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
    tableName: 'service_group_sources'
  });
  ServiceGroupSource.associate = function(models) {
    // associations can be defined here

  };
  return ServiceGroupSource;
};
