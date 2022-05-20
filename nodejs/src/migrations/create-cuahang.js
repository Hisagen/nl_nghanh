'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cuahangs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      storeName: {
        type: Sequelize.STRING
      },
      idCuahang: {
        type: Sequelize.INTEGER
      },
      // firstName: {
      //   type: Sequelize.STRING
      // },
      // lastName: {
      //   type: Sequelize.STRING
      // },
      // password: {
      //   type: Sequelize.STRING
      // },
      // email: {
      //   type: Sequelize.STRING
      // },
      // address: {
      //   type: Sequelize.STRING
      // },
      // sdt: {
      //   type: Sequelize.STRING
      // },
      // gender: {
      //   type: Sequelize.STRING
      // },
      // typeRole: {
      //   type: Sequelize.STRING
      // },
      // avt: {
      //   type: Sequelize.BLOB('long')
      // },
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
    await queryInterface.dropTable('cuahangs');
  }
};