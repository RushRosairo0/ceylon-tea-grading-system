'use strict';

/** @type {import('sequelize-cli').Migration} */
const teaGradeEnum = require('../enums/grades');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_feedbacks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      prediction_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'predictions',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      is_agreed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      grade: {
        type: Sequelize.ENUM(...teaGradeEnum.values),
        allowNull: false,
        defaultValue: teaGradeEnum.OP,
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: true,
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

    // unique constraint to prevent duplicated feedbacks from the same user on same prediction
    await queryInterface.addConstraint('user_feedbacks', {
      fields: ['prediction_id', 'user_id'],
      type: 'unique',
      name: 'unique_feedback_per_user_per_prediction',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_feedbacks');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_user_feedbacks_grade";');
  },
};
