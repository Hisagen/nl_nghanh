'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class loaisps extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      loaisps.hasOne(models.sanphams, {foreignKey: 'ma_loaisp'}) // sản phẩm thuộc 1 loại sản phẩm

      loaisps.belongsTo(models.danhmucs, { foreignKey: "ma_dm"})
      //loaisps.belongsTo(models.danhmucs, {foreignKey: 'ma_dm', targetKey: "id", as: 'danhmucData'})
    }
  };
  loaisps.init({
    ten_loaisp: DataTypes.STRING,
    ma_dm: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'loaisps',
  });
  return loaisps;
};