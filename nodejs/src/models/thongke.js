'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class thongkes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
  };
  thongkes.init({
      avt: DataTypes.BLOB('long'),
      soluong: DataTypes.INTEGER,
      MaSP: DataTypes.INTEGER,
      MaCH:DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: 'thongkes',
  });
  return thongkes;
}; 
