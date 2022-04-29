'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('giohangs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
    //   ten_sp:DataTypes.STRING,
    // gia_sp:DataTypes.INTEGER,
    // soluong_sp: DataTypes.INTEGER,
    // id_sp: DataTypes.STRING,
    // id_nguoidung: DataTypes.INTEGER
      avt: {
        type: Sequelize.BLOB('long'),
        allowNull: true,
      },
      ten_sp: {
        type: Sequelize.STRING
      },
      gia_sp: {
        type: Sequelize.INTEGER
      },
      soluong_sp: {
        type: Sequelize.INTEGER
      },
      thanhtien: {
        type: Sequelize.INTEGER
      },
      id_sp: {
        type: Sequelize.INTEGER
      },
      id_nguoidung: {
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
    await queryInterface.dropTable('giohangs');
  }
};