'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TeaImage extends Model {
    static associate(models) {
      // single tea image always belong to a single user
      TeaImage.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });

      // single tea image is always associated with a single prediction
      TeaImage.hasOne(models.Prediction, {
        foreignKey: 'imageId',
        as: 'prediction',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

  TeaImage.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'url',
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id',
      },
    },
    {
      sequelize,
      modelName: 'TeaImage',
      tableName: 'tea_images',
      underscored: true,
      timestamps: true,
    },
  );

  return TeaImage;
};
