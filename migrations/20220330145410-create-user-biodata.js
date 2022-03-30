'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_biodata', {

      userid: {
        allowNull: false,
        type: Sequelize.INTEGER
        references: {
          model: "user",
          key: "id"
        }
      },
      name: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      hobby: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('user_biodata');
  }
};