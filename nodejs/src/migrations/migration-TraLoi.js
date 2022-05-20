'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TraLois', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
    NoiDungTL: {
        allowNull: false,
        type: Sequelize.TEXT('long'),
      },
      MaBL: {
        type: Sequelize.INTEGER
        },
      MaSP: {
        type: Sequelize.INTEGER
        },
      MaNguoiTL: {
        type: Sequelize.INTEGER
        },
      TrangThai: {
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
    await queryInterface.dropTable('TraLois');
  }
};