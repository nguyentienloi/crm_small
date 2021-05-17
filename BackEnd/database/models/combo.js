'use strict';
module.exports = (sequelize, DataTypes) => {
  const Combo = sequelize.define('Combo', {
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
    tableName: 'combos'
  });
  Combo.associate = function(models) {
    // associations can be defined here
    Combo.belongsToMany(models.Service, {
      as: 'services',
      through: models.ServiceCombo,
      foreignKey: 'comboId',
      otherKey: 'serviceId',

    });
  };
  return Combo;
};
