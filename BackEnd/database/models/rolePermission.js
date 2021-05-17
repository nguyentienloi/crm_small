'use strict';
module.exports = (sequelize, DataTypes) => {
  const RolePermission = sequelize.define('RolePermission', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    roleId: {
      allowNull: false,
      type: DataTypes.INTEGER(10).UNSIGNED,
    },
    permissionId: {
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
    tableName: 'role_permissions'
  });
  RolePermission.associate = function(models) {
    // associations can be defined here
    RolePermission.belongsTo(models.Permission, {
      as: 'permission',
      foreignKey: 'permissionId',
      targetKey: 'id',
    });
    RolePermission.belongsTo(models.Role, {
      as: 'role',
      foreignKey: 'roleId',
      targetKey: 'id',
    });
  };
  return RolePermission;
};
