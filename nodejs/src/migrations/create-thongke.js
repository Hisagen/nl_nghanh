'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('thongkes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      avt: {
        allowNull: false,
        type: Sequelize.BLOB('long'),
      },
      soluong: {
        type: Sequelize.DATE
        },
      MaSP: {
        type: Sequelize.INTEGER
      },
      MaCH: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('thongkes');
  }
}; 