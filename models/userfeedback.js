'use strict';

const { Model } = require('sequelize');
const teaGradeEnum = require('../enums/grades');

module.exports = (sequelize, DataTypes) => {
  class UserFeedback extends Model {
    static associate(models) {
      // single feedback belongs to a single user
      UserFeedback.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });

      // single feedback is based on a single prediction
      UserFeedback.belongsTo(models.Prediction, {
        foreignKey: 'predictionId',
        as: 'prediction',
      });

      // single feedback can have a single sensory evaluation
      UserFeedback.hasOne(models.SensoryEvaluation, {
        foreignKey: 'feedbackId',
        as: 'sensoryEvaluation',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

  UserFeedback.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      predictionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'prediction_id',
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id',
      },
      isAgreed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: 'is_agreed',
      },
      grade: {
        type: DataTypes.ENUM(...teaGradeEnum.values),
        allowNull: false,
        defaultValue: teaGradeEnum.OP,
        field: 'grade',
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'comment',
      },
    },
    {
      sequelize,
      modelName: 'UserFeedback',
      tableName: 'user_feedbacks',
      underscored: true,
      timestamps: true,
    },
  );

  return UserFeedback;
};
