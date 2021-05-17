'use strict';
module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define('Permission', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    model: {
      allowNull: false,
      type: DataTypes.ENUM('user', 'service', 'service_combo', 'service_group',
          'order', 'contact', 'department', 'role', 'call_center', 'schedule', 'kpi',
      ),
    },
    action: {
      allowNull: false,
      type: DataTypes.ENUM('read', 'create', 'update', 'delete', 'approve', 'reset_password', 'view_all'),
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
    tableName: 'permissions'
  });
  Permission.associate = function(models) {
    // associations can be defined here
  };
  return Permission;
};
