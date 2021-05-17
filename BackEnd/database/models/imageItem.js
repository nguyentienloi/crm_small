'use strict';
module.exports = (sequelize, DataTypes) => {
  const ImageItem = sequelize.define('ImageItem', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    imageId: {
      allowNull: false,
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    isThumbnail: {
      allowNull: false,
      default: false,
      type: DataTypes.BOOLEAN
    },
    order: {
      allowNull: true,
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    modelName: {
      allowNull: false,
      type: DataTypes.ENUM('service')
    },
    modelId: {
      allowNull: false,
      type: DataTypes.INTEGER(10).UNSIGNED
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
    tableName: 'image_items'
  });
  ImageItem.associate = function(models) {
    // associations can be defined here
  };
  return ImageItem;
};
