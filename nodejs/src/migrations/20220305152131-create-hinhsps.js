'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('hinhsps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      image1: {
        type: Sequelize.BLOB('long'),
        allowNull: true,
      },
      image2: {
        type: Sequelize.BLOB('long'),
        allowNull: true,
      },
      image3: {
        type: Sequelize.BLOB('long'),
        allowNull: true,
      },
      ma_sp: {
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('hinhsps');
  }
};