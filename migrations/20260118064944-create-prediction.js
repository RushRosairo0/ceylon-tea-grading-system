'use strict';

/** @type {import('sequelize-cli').Migration} */
const teaGradeEnum = require('../enums/grades');
const teaCategoryEnum = require('../enums/categories');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('predictions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      image_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tea_images',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      predicted_grade: {
        type: Sequelize.ENUM(...teaGradeEnum.values),
        allowNull: false,
        defaultValue: teaGradeEnum.OP,
      },
      grade_confidence: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      predicted_category: {
        type: Sequelize.ENUM(...teaCategoryEnum.values),
        allowNull: false,
        defaultValue: teaCategoryEnum.CAT1,
      },
      category_confidence: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      model_version: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // unique constraint to enforce 1-to-1 relationship
    await queryInterface.addConstraint('predictions', {
      fields: ['image_id'],
      type: 'unique',
      name: 'unique_prediction_per_image',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('predictions');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_predictions_predicted_grade";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_predictions_predicted_category";');
  },
};
