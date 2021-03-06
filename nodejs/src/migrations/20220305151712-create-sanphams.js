'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sanphams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ten_sp: {
        type: Sequelize.STRING
      },
      qc_spHTML: {
        allowNull: false,
        type: Sequelize.TEXT('long'),
      },
      qc_spMarkdown: {
        allowNull: false,
        type: Sequelize.TEXT('long'),
      },
      sl_sp: {
        type: Sequelize.STRING
      },
      trangthai: {
        type: Sequelize.STRING
      },
      trangThaiBL: {
        type: Sequelize.STRING
      },
      // msadmin: DataTypes.INTEGER,
      // ma_loaisp: DataTypes.INTEGER,
      // ma_hinhsp: DataTypes.INTEGER,

      msadmin: {
        type: Sequelize.INTEGER
      },
      ma_loaisp: {
        type: Sequelize.INTEGER
      },
      avt: {
        type: Sequelize.BLOB('long'),
        allowNull: true,
      },
      idCuahang: {
        type: Sequelize.INTEGER
      },
      // manhinh: DataTypes.STRING,
      // HDH: DataTypes.STRING,
      // cameraSau: DataTypes.STRING,
      // cameraTruoc: DataTypes.STRING,
      // chip: DataTypes.STRING,
      // ram: DataTypes.STRING,
      // bonho: DataTypes.STRING,
      // pin: DataTypes.STRING,
      gia: {
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
    await queryInterface.dropTable('sanphams');
  }
};