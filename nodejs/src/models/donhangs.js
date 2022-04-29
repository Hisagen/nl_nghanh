'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class donhangs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // donhangs.hasOne(models.allCode, { foreignKey: 'keyMap'})
      // donhangs.belongsTo(models.allCode, {foreignKey: 'trangthai', targetKey: "keyMap", as: 'trangthaiData'})
        donhangs.hasOne(models.allCode, {foreignKey: 'keyMap'})


    }
  };
  donhangs.init({
    ngaydathang: DataTypes.INTEGER,
    ngaygiaohang: DataTypes.DATE,
    dc_gh: DataTypes.STRING,
    // ma_htgh: DataTypes.INTEGER,
    tongtien: DataTypes.INTEGER,
    trangthai: DataTypes.STRING,
    ma_nguoidung: DataTypes.INTEGER,
    ma_nhanvien: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'donhangs',
  });
  return donhangs;
};