'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('donhangs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ngaydathang: {
        type: Sequelize.INTEGER
      },
      ngaygiaohang: {
        type: Sequelize.DATE
      },
      dc_gh: {
        type: Sequelize.STRING
      },
      tongtien: {
        type: Sequelize.INTEGER
      },
      trangthai: {
        type: Sequelize.STRING
      },
      ma_nguoidung: {
        type: Sequelize.INTEGER
      },
      ma_nhanvien: {
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
    await queryInterface.dropTable('donhangs');
  }
};