'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ungdungs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
    contentHTML: {
        allowNull: false,
        type: Sequelize.TEXT('long'),
      },
      contentMarkdown: {
        allowNull: false,
        type: Sequelize.TEXT('long'),
      },
      description: {
        allowNull: true,
        type: Sequelize.TEXT('long'),
      },
      SPId: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      avt: {
        type: Sequelize.BLOB('long'),
        allowNull: true,
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ungdungs');
  }
};