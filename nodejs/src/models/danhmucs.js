'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class danhmucs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      //danhmucs.hasMany(models.loaisps, { foreignKey: 'ma_dm', as: 'danhmucData'})
      danhmucs.hasMany(models.loaisps, { foreignKey: 'id', as: 'idData'}) // sản phẩm thuộc 1 loại sản phẩm
    }
  };
  danhmucs.init({
    ten_dm: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'danhmucs',
  });
  return danhmucs;
};