'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      allowNull: false,
      type: DataTypes.STRING
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    phone: {
      allowNull: true,
      type: DataTypes.STRING
    },
    ext: {
      allowNull: true,
      type: DataTypes.STRING
    },
    extPassword: {
      allowNull: true,
      type: DataTypes.STRING
    },
    email: {
      allowNull: true,
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    departmentId: {
      allowNull: false,
      type: DataTypes.INTEGER(10).UNSIGNED,
    },
    avatarId: {
      allowNull: true,
      type: DataTypes.INTEGER(10).UNSIGNED,
    },
    position: {
      type: DataTypes.ENUM('sale_leader', 'telesales', 'sale_manager', 'sale_admin', 'admin'),
      defaultValue: 'telesales',
    },
    roleId: {
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
    tableName: 'users',
  });
  User.associate = function(models) {
    // associations can be defined here
    User.belongsTo(models.Department, {
      as: 'department',
      foreignKey: 'departmentId',
      targetKey: 'id',
    });
    User.belongsTo(models.Role, {
      as: 'role',
      foreignKey: 'roleId',
      targetKey: 'id',
    });
    User.belongsTo(models.Image, {
      as: 'avatar',
      foreignKey: 'avatarId',
      targetKey: 'id',
    });
  };
  return User;
};
