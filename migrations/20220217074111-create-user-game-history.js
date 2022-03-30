'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_game_histories', {
      userid: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        references: {
          model: "user",
          key: "id"
        }
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING
      },
      play_date: {
        type: Sequelize.DATE
      },
      win_score: {
        type: Sequelize.INTEGER
      },
      loss_score: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_game_histories');
  }
};