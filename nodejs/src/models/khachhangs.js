'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class khachhangs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  khachhangs.init({
    ten_kh: DataTypes.STRING,
    password: DataTypes.STRING,
    hoten: DataTypes.STRING,
    sdt: DataTypes.INTEGER,
    diachi: DataTypes.STRING,
    gioitinh: DataTypes.BOOLEAN,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'khachhangs',
  });
  return khachhangs;
};