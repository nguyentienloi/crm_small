'use strict';
module.exports = (sequelize, DataTypes) => {
  const ServiceCombo = sequelize.define('ServiceCombo', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    comboId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
    },
    serviceId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
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
    tableName: 'service_combos'
  });
  ServiceCombo.associate = function(models) {
    // associations can be defined here

  };
  return ServiceCombo;
};
