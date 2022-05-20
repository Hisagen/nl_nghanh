'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BinhLuans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
    NoiDungBL: {
        allowNull: false,
        type: Sequelize.TEXT('long'),
      },
      Time: {
        type: Sequelize.DATE
        },
      MaNguoiBL: {
        type: Sequelize.INTEGER
      },
      MaSP: {
        type: Sequelize.INTEGER
      },
      TrangThai: {
        type: Sequelize.STRING
      },
      TrangThaiBL: {
        type: Sequelize.STRING
      },
      anhBL: {
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
    await queryInterface.dropTable('BinhLuans');
  }
};