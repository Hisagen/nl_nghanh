'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('khachhangs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ten_kh: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      hoten: {
        type: Sequelize.STRING
      },
      sdt: {
        type: Sequelize.INTEGER
      },
      diachi: {
        type: Sequelize.STRING
      },
      gioitinh: {
        type: Sequelize.BOOLEAN
      },
      email: {
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
    await queryInterface.dropTable('khachhangs');
  }
};