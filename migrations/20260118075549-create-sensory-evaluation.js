'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sensory_evaluations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      feedback_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user_feedbacks',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      aroma: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      taste: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      after_taste: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      color: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      overall_accept: {
        type: Sequelize.INTEGER,
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

    // check constraints for 1–7 range
    const columns = ['aroma', 'taste', 'after_taste', 'color', 'overall_accept'];
    for (const col of columns) {
      await queryInterface.addConstraint('sensory_evaluations', {
        fields: [col],
        type: 'check',
        where: {
          [col]: { [Sequelize.Op.gte]: 1, [Sequelize.Op.lte]: 7 },
        },
        name: `${col}_range_check`,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('sensory_evaluations');
  },
};
