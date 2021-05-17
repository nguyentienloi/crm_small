'use strict';
const config = require('config');

export const UPLOAD_FOLDER = config.get('api.storage_server') || '';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    originalName: {
      allowNull: true,
      type: DataTypes.STRING
    },
    path: {
      allowNull: false,
      type: DataTypes.STRING
    },
    filePath: {
      type: DataTypes.VIRTUAL,
      get () {
        return `${UPLOAD_FOLDER}${this.getDataValue('path')}`;
      },
    },
    fileName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    extension: {
      allowNull: true,
      type: DataTypes.STRING
    },
    mimetype: {
      allowNull: true,
      type: DataTypes.STRING
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
    tableName: 'images'
  });
  Image.associate = function(models) {
    // associations can be defined here
  };
  return Image;
};
