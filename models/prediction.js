'use strict';

const { Model } = require('sequelize');
const teaGradeEnum = require('../enums/grades');
const teaCategoryEnum = require('../enums/categories');

module.exports = (sequelize, DataTypes) => {
  class Prediction extends Model {
    static associate(models) {
      // single prediction is always caused by a single image
      Prediction.belongsTo(models.TeaImage, {
        foreignKey: 'imageId',
        as: 'image',
      });
    }
  }

  Prediction.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      imageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'image_id',
      },
      predictedGrade: {
        type: DataTypes.ENUM(...teaGradeEnum.values),
        allowNull: false,
        defaultValue: teaGradeEnum.OP,
        field: 'predicted_grade',
      },
      predictedCategory: {
        type: DataTypes.ENUM(...teaCategoryEnum.values),
        allowNull: false,
        defaultValue: teaCategoryEnum.CAT1,
        field: 'predicted_category',
      },
      confidence: {
        type: DataTypes.FLOAT,
        allowNull: false,
        field: 'confidence',
      },
      modelVersion: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'model_version',
      },
    },
    {
      sequelize,
      modelName: 'Prediction',
      tableName: 'predictions',
      underscored: true,
      timestamps: true,
    },
  );

  return Prediction;
};
