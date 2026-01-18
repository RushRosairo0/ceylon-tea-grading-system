'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SensoryEvaluation extends Model {
    static associate(models) {
      // single evaluation belongs to a single feedback
      SensoryEvaluation.belongsTo(models.UserFeedback, {
        foreignKey: 'feedbackId',
        as: 'feedback',
      });
    }
  }

  SensoryEvaluation.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      feedbackId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'feedback_id',
      },
      aroma: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 7,
        },
        field: 'aroma',
      },
      taste: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 7,
        },
        field: 'taste',
      },
      afterTaste: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 7,
        },
        field: 'after_taste',
      },
      color: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 7,
        },
        field: 'color',
      },
      overallAccept: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 7,
        },
        field: 'overall_accept',
      },
    },
    {
      sequelize,
      modelName: 'SensoryEvaluation',
      tableName: 'sensory_evaluations',
      underscored: true,
      timestamps: true,
    },
  );

  return SensoryEvaluation;
};
